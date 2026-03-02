import { store, getContext } from '@wordpress/interactivity';

/**
 * Initialization of the 'lzm-lead-button' block store.
 * The 'state' reference destructuring enables reactive access to the global state.
 */

const { state, actions } = store( 'lzm-lead-button', {
    state: {
        /**
         * Unique identifier for the currently active modal within the global application scope.
         * @type {string|null}
         */
        activeModalId: null,

        /**
         * Derived state to determine the current component's visibility.
         * Compares the global active identifier with the block's local context.
         * * @returns {boolean}
         */
        get isOpen() {
            const context = getContext();            
            return state.activeModalId === context.blockId;
        },

       /**
         * Form logic integrity validation.
         * Verifies the existence and minimum required length of the input string.
         * * @returns {boolean}
         */
        get isFormValid() {
            const context = getContext();            
            const minLen = context.minNameLength || 2;            
            return context.name && context.name.trim().length >= minLen;
        }
    },
    actions: {
        /**
         * Sets the current block identifier as active in the global state
         * and manages the body element's scroll restriction.
         */
        openModal: () => {
            const context = getContext();
            
            const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
            
            if ( scrollbarWidth > 0 ) {                
                
                document.body.style.paddingRight = `${scrollbarWidth}px`;
                document.documentElement.style.setProperty('--lzm-scrollbar-width', `${scrollbarWidth}px`);
                
                const candidates = document.querySelectorAll(
                    'body > *, header, nav, #wpadminbar, [class*="header"], [class*="menu"], [class*="fixed"], [class*="sticky"]'
                );                
               
                const uniqueCandidates = new Set(candidates);

                uniqueCandidates.forEach( el => {
                    
                    if ( el.classList.contains('lzm-lead-button-overlay') ) return;

                    const style = window.getComputedStyle(el);                    
                    
                    if ( style.position === 'fixed' || style.position === 'sticky' ) {
                        
                        if ( el.offsetWidth >= (window.innerWidth - 50) ) {                            
                            
                            const originalPadding = style.paddingRight;
                            el.dataset.lzmOriginPad = originalPadding;                            
                           
                            el.style.paddingRight = `${scrollbarWidth}px`;
                            el.dataset.lzmFixed = 'true';
                        }
                    }
                });
            }

            state.activeModalId = context.blockId;
            document.body.style.overflow = 'hidden';
        },

       /**
         * Resets the global active modal state to null, restores body scrolling,
         * and clears temporary data from the local context.
         */
        closeModal: () => {
            const context = getContext();            
            state.activeModalId = null;
            
            setTimeout(() => {
                document.body.style.overflow = '';            
                document.body.style.removeProperty('padding-right');
                document.documentElement.style.removeProperty('--lzm-scrollbar-width');
                
                const fixedElements = document.querySelectorAll('[data-lzm-fixed="true"]');
                fixedElements.forEach( el => {
                    
                    if ( el.dataset.lzmOriginPad && el.dataset.lzmOriginPad !== '0px' ) {
                        el.style.paddingRight = el.dataset.lzmOriginPad;
                    } else {
                        el.style.removeProperty('padding-right');
                    }
                    
                    delete el.dataset.lzmFixed;
                    delete el.dataset.lzmOriginPad;
                });
            }, 50);
                     
            context.name = '';
        },

        /**
         * Updates the 'name' property in the local context with security truncation.
         * * @param {Event} e The input event.
         */
        updateName: ( e ) => {
            const context = getContext();
            context.name = e.target.value.substring(0, 25);
        },

        /**
         * Stops event propagation to prevent unintended side effects on parent elements.
         * * @param {Event} e The click event.
         */
        stopProp: ( e ) => {
            e.stopPropagation();
        },

        /**
         * Orchestrates lead processing: sanitization, URI composition, and redirection.
         */
        sendLead: () => {
            const context = getContext();

            const minLen = context.minNameLength || 2;

            // 1. Sanitization: Removal of HTML tags and leading/trailing whitespace.
            const rawName = context.name || '';
            const cleanName = rawName.replace(/<\/?[^>]+(>|$)/g, "").trim();
            
            if ( cleanName.length < minLen ) return;

            // 2. URI composition using parameters defined within the block context.
            const { messagePrefix, messageSuffix, phoneNumber, customUrl, useCustomLink, openInNewTab } = context;

            let fullMessage = `${messagePrefix} ${cleanName}`;
            
            if ( messageSuffix && messageSuffix.trim() !== '' ) {
                 const separator = messageSuffix.trim().match(/^[.,;!]/) ? '' : ' '; 
                 fullMessage += `${separator}${messageSuffix}`;
            }

            const encodedMsg = encodeURIComponent(fullMessage);
            let url = useCustomLink && customUrl ? customUrl : `https://wa.me/${phoneNumber}?text=${encodedMsg}`;

            // 3. Redirection execution with protocol validation.
            try {
                const finalUrl = new URL(url);
                if ( finalUrl.protocol === 'https:' || finalUrl.protocol === 'http:' ) {
                    if ( openInNewTab ) {
                        window.open( finalUrl.href, '_blank', 'noopener,noreferrer' );
                    } else {
                        window.location.href = finalUrl.href;
                    }
                }
            } catch (e) {
                console.error( "Invalid destination URL" );
            }

            // 4. Finalization: Global state reset and local context cleanup.
            actions.closeModal();
        }
    }
} );