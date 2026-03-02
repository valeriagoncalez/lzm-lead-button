import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls, PanelColorSettings, BlockControls } from '@wordpress/block-editor';
import {
    ToolbarGroup, 
    ToolbarDropdownMenu,
    PanelBody, 
    TextControl, 
    ToggleControl,    
    SelectControl,
    RangeControl,
    __experimentalUnitControl as UnitControl
} from '@wordpress/components';


const resolveWPPreset = (value) => {
    if (typeof value !== 'string' || !value.includes('var:preset|')) return value;
    const parts = value.split('|');
    const slug = parts[parts.length - 1];
    const type = parts[parts.length - 2];
    return `var(--wp--preset--${type}--${slug})`;
};

export default function Edit( { attributes, setAttributes } ) {
	const { 
        style,
		useCustomLink, 
		phoneNumber, 
		customUrl, 
		buttonText, 
		modalTitle,
        minNameLength,
        modalButtonText,
        placeholderText,
        modalIconVariant,        
        maxWidth,        
        iconSize,        
        iconVariant,
        openInNewTab,
        overlayColor,
        modalBtnColor,
        modalBtnTextColor,
        modalBackgroundColor,
        modalTextColor,
        modalBtnBorderColor,
        messagePrefix,
        messageSuffix,
        mainButtonId,
        modalButtonId
	} = attributes;


    const iconLeft = (
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
            <path d="M4 4h2v16H4V4zm4 5h9v6H8V9z" />
        </svg>
    );

    const iconCenter = (
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
            <path d="M11 4h2v16h-2V4zm-4 5h10v6H7V9z" />
        </svg>
    );

    const iconRight = (
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
            <path d="M18 4h2v16h-2V4zm-9 5h9v6H9V9z" />
        </svg>
    );

    const currentAlign = attributes.buttonAlignment || 'left';
    
    let activeIcon = iconLeft;
    if ( currentAlign === 'center' ) activeIcon = iconCenter;
    if ( currentAlign === 'right' ) activeIcon = iconRight;


    const iconOptions = [
        { label: __( 'Outline', 'lzm-lead-button' ), value: 'outline' },
        { label: __( 'Solid', 'lzm-lead-button' ), value: 'solid' },
        { label: __( 'Text Only (No Icon)', 'lzm-lead-button' ), value: 'none' },
    ];

    const displayPrefix = typeof messagePrefix === 'undefined' 
    ? __( 'Hello, my name is', 'lzm-lead-button' ) 
    : messagePrefix;     
    
    const blockProps = useBlockProps( {
		className: 'lzm-lead-button-block',            
	} );
    

    const bgColor = attributes.backgroundColor 
        ? `var(--wp--preset--color--${attributes.backgroundColor})` 
        : (resolveWPPreset(style?.color?.background) || '#25d366');

    const txtColor = attributes.textColor 
        ? `var(--wp--preset--color--${attributes.textColor})` 
        : (resolveWPPreset(style?.color?.text) || '#ffffff');


    const paddingSettings = style?.spacing?.padding;
    let padding = '10px 10px 10px 10px';
    if ( paddingSettings ) {
        if ( typeof paddingSettings === 'object' ) {            
            const paddingTop    = resolveWPPreset( paddingSettings.top )    || '0px';
            const paddingRight  = resolveWPPreset( paddingSettings.right )  || '0px';
            const paddingBottom = resolveWPPreset( paddingSettings.bottom ) || '0px';
            const paddingLeft   = resolveWPPreset( paddingSettings.left )   || '0px';
            
            padding = `${paddingTop} ${paddingRight} ${paddingBottom} ${paddingLeft}`;
        } else {            
            padding = resolveWPPreset( paddingSettings );
        }
    }

    const marginLeftVal  = (currentAlign === 'center' || currentAlign === 'right') ? 'auto' : '0px';
    const marginRightVal = (currentAlign === 'center' || currentAlign === 'left')  ? 'auto' : '0px';

    const gapSettings = style?.spacing?.blockGap;
    const gapValue = resolveWPPreset( gapSettings ) || '16px';


    let radiusVal = '5px';
    if ( style?.border?.radius ) {
        const r = style.border.radius;
        radiusVal = typeof r === 'object'
            ? `${r.topLeft||0} ${r.topRight||0} ${r.bottomRight||0} ${r.bottomLeft||0}`
            : r;
    }


    let borderWidthVal = '0px';
    if ( style?.border?.width ) {
        const w = style.border.width;
        borderWidthVal = typeof w === 'object' 
            ? `${w.top || 0} ${w.right || 0} ${w.bottom || 0} ${w.left || 0}`
            : w;
    }

    const borderStyleVal = style?.border?.style || ( style?.border?.width ? 'solid' : 'none' );
    
    const borderColorVal = attributes.borderColor 
        ? `var(--wp--preset--color--${attributes.borderColor})` 
        : (style?.border?.color || 'transparent');

    const shadowVal = resolveWPPreset( style?.shadow ) || 'none';


    const buttonStyles = {        
        backgroundColor: bgColor,
        color: txtColor,
        padding: padding,
        marginLeft: marginLeftVal,
        marginRight: marginRightVal,
        gap: gapValue,
        borderRadius: radiusVal,
        borderWidth: borderWidthVal,
        borderStyle: borderStyleVal,
        borderColor: borderColorVal,
        boxShadow: shadowVal,      
        width: maxWidth || '100%',

        '--lzm-icon-size': iconSize || '24px',
        '--lzm-overlay-bg': overlayColor || 'rgba(0, 0, 0, 0.7)',        
        '--lzm-width': maxWidth || '100%',

        
    };

	return (
        <>
            <BlockControls>
                <ToolbarGroup>
                    <ToolbarDropdownMenu
                        icon={ activeIcon }
                        label={ __( 'Button Alignment', 'lzm-lead-button' ) }
                        controls={[
                            {
                                title: __( 'Align Left', 'lzm-lead-button' ),
                                icon: iconLeft,
                                onClick: () => setAttributes( { buttonAlignment: 'left' } ),
                                isActive: currentAlign === 'left',
                            },
                            {
                                title: __( 'Align Center', 'lzm-lead-button' ),
                                icon: iconCenter,
                                onClick: () => setAttributes( { buttonAlignment: 'center' } ),
                                isActive: currentAlign === 'center',
                            },
                            {
                                title: __( 'Align Right', 'lzm-lead-button' ),
                                icon: iconRight,
                                onClick: () => setAttributes( { buttonAlignment: 'right' } ),
                                isActive: currentAlign === 'right',
                            },
                        ]}
                    />
                </ToolbarGroup>
            </BlockControls>

            <div { ...blockProps }>
                <InspectorControls>

                    <PanelBody title={ __( 'Destination Settings', 'lzm-lead-button' ) }>
                        
                        <ToggleControl
                            label={ __( 'Use Custom Link', 'lzm-lead-button' ) }
                            help={ useCustomLink 
                                ? __( 'Send leads to a custom URL (e.g. Tracking).', 'lzm-lead-button' )
                                : __( 'Link automatically generated from phone number.', 'lzm-lead-button' )
                            }
                            checked={ useCustomLink }
                            onChange={ () => setAttributes( { useCustomLink: ! useCustomLink } ) }
                        />
                        <hr />
                        { useCustomLink ? (
                            <TextControl
                                label={ __( 'Tracking URL', 'lzm-lead-button' ) }
                                value={ customUrl }
                                onChange={ ( val ) => setAttributes( { customUrl: val } ) }
                                help={ __( 'Paste the full URL here (e.g. https://...).', 'lzm-lead-button' ) }
                            />
                        ) : (
                            <TextControl
                                label={ __( 'WhatsApp Number', 'lzm-lead-button' ) }
                                value={ phoneNumber }
                                onChange={ ( val ) => setAttributes( { phoneNumber: val } ) }
                                help={ __( 'e.g. 15551234567', 'lzm-lead-button' ) }
                            />
                        ) }
                        <hr />    

                        <ToggleControl
                            label={ __( 'Open in new tab', 'lzm-lead-button' ) }
                            checked={ openInNewTab }
                            onChange={ () => setAttributes( { openInNewTab: ! openInNewTab } ) }
                            help={ openInNewTab 
                                ? __( 'The link will open in a new tab.', 'lzm-lead-button' ) 
                                : __( 'The link will open in the same tab.', 'lzm-lead-button' ) 
                            }
                        />
                    </PanelBody>                

                    <PanelBody title={ __( 'Button', 'lzm-lead-button' )} initialOpen={ false}>
                        <TextControl
                            label={ __( 'Button Text', 'lzm-lead-button' ) }
                            value={ buttonText }
                            onChange={ ( val ) => setAttributes( { buttonText: val } ) }
                        /> 

                        <hr/>
                        <UnitControl
                            label={ __( 'Desktop Button Width', 'lzm-lead-button' ) }
                            value={ maxWidth }
                            onChange={ ( val ) => setAttributes( { maxWidth: val } ) }
                            help={ __( 'Sets the width limit (e.g. 500px, 100%, 30rem).', 'lzm-lead-button' ) }
                        />
                        
                        <SelectControl
                            label={ __( 'Icon Style', 'lzm-lead-button' ) }
                            value={ iconVariant }
                            options={ iconOptions }
                            onChange={ ( val ) => setAttributes( { iconVariant: val } ) }
                        />

                        <UnitControl
                            label={ __( 'Icon Size', 'lzm-lead-button' ) }
                            value={ iconSize }
                            onChange={ ( val ) => setAttributes( { iconSize: val } ) }
                        />
                    </PanelBody>

                    <PanelBody title={ __( 'Modal', 'lzm-lead-button' ) } initialOpen={ false}>
                        <TextControl
                            label={ __( 'Modal Title', 'lzm-lead-button' ) }
                            value={ modalTitle }
                            placeholder={ __('Enter your name', 'lzm-lead-button') }
                            onChange={ ( val ) => setAttributes( { modalTitle: val } ) }
                        />

                        <hr/>
                        <TextControl
                            label={ __( 'Input Text', 'lzm-lead-button' ) }
                            value={ placeholderText }
                            placeholder={ __( 'Your name', 'lzm-lead-button' ) }
                            onChange={ ( value ) => setAttributes( { placeholderText: value } ) }
                            help={ __( 'The text displayed inside the name field.', 'lzm-lead-button' ) }
                        />

                        <RangeControl
                            label={ __( 'Minimum Name Length', 'lzm-lead-button' ) }
                            help={ __( 'Minimum characters required to enable the submit button.', 'lzm-lead-button' ) }
                            value={ minNameLength }
                            onChange={ ( val ) => setAttributes( { minNameLength: val } ) }
                            min={ 1 }
                            max={ 10 }
                            initialPosition={ 2 }
                        />                    

                        <hr/>
                        <TextControl
                            label="Button Text"
                            value={ modalButtonText }
                            placeholder={ __( 'Start Chat', 'lzm-lead-button' ) }
                            onChange={ ( val ) => setAttributes( { modalButtonText: val } ) }
                            help={ __('Text displayed on the submit button inside the form.', 'lzm-lead-button') }
                        />

                        <SelectControl
                            label={ __( 'Submit Button Icon', 'lzm-lead-button' ) }
                            value={ modalIconVariant }
                            options={ iconOptions }
                            onChange={ ( val ) => setAttributes( { modalIconVariant: val } ) }
                            help={ __('Choose whether to display the WhatsApp icon on the submit button.', 'lzm-lead-button') }
                        />

                        <PanelColorSettings
                            title={ __( 'Modal Colors', 'lzm-lead-button' ) }
                            initialOpen={ false }
                            enableAlpha={ true }
                            colorSettings={ [
                                {
                                    value: overlayColor,
                                    onChange: ( colorValue ) => setAttributes( { overlayColor: colorValue } ),
                                    label: __( 'Overlay Background Color', 'lzm-lead-button' ),
                                    help: __( 'Select a solid or transparent color for the modal overlay.', 'lzm-lead-button' ),
                                },
                                {
                                    value: modalBackgroundColor,
                                    onChange: ( colorValue ) => setAttributes( { modalBackgroundColor: colorValue } ),
                                    label: __( 'Modal Background', 'lzm-lead-button' ),
                                },
                                {
                                    value: modalTextColor,
                                    onChange: ( colorValue ) => setAttributes( { modalTextColor: colorValue } ),
                                    label: __( 'Modal Text Color', 'lzm-lead-button' ),
                                },
                                {
                                    value: modalBtnColor,
                                    onChange: ( colorValue ) => setAttributes( { modalBtnColor: colorValue } ),
                                    label: __( 'Submit Button Background', 'lzm-lead-button' ),
                                },
                                {
                                    value: modalBtnBorderColor,
                                    onChange: ( colorValue ) => setAttributes( { modalBtnBorderColor: colorValue } ),
                                    label: __( 'Submit Button Border Color', 'lzm-lead-button' ),
                                },
                                {
                                    value: modalBtnTextColor,
                                    onChange: ( colorValue ) => setAttributes( { modalBtnTextColor: colorValue } ),
                                    label: __( 'Submit Button Text', 'lzm-lead-button' ),
                                },
                            ] }
                        />
                    </PanelBody>

                    <PanelBody title={ __( 'Tracking ID', 'lzm-lead-button' ) } initialOpen={ false}>
                        <TextControl
                            label={ __( 'Button Tracking ID', 'lzm-lead-button' ) }
                            value={ mainButtonId }
                            maxLength={ 50 }
                            onChange={ ( val ) => setAttributes( { mainButtonId: val } ) }
                            help={ __( 'Optional. HTML ID for GTM or Analytics.', 'lzm-lead-button' ) }
                        />

                        <TextControl
                            label={ __( 'Submit Button Tracking ID', 'lzm-lead-button' ) }
                            value={ modalButtonId }
                            maxLength={ 50 }
                            onChange={ ( val ) => setAttributes( { modalButtonId: val } ) }
                            help={ __( 'Optional. HTML ID to track the final conversion.', 'lzm-lead-button' ) }
                        />
                    </PanelBody>

                    <PanelBody title={ __( 'Message', 'lzm-lead-button' ) } initialOpen={ false}>
                        <p style={{fontSize: '12px', color: '#666', marginBottom: '15px', fontStyle: 'italic'}}>                        
                            { __('Generated message structure:', 'lzm-lead-button') }<br/>                        
                            <b>{ __('[Prefix]', 'lzm-lead-button') }</b> + 
                            <b>{ __('[Name]', 'lzm-lead-button') }</b> + 
                            <b>{ __('[Suffix]', 'lzm-lead-button') }</b>
                        </p>

                        <TextControl
                            label={ __( 'Text Before Name (Prefix)', 'lzm-lead-button' ) }
                            value={ displayPrefix }
                            onChange={ ( val ) => setAttributes( { messagePrefix: val } ) }
                            help={ __( 'e.g. "Hello, my name is "', 'lzm-lead-button' ) }
                        />

                        <TextControl
                            label={ __( 'Text After Name (Suffix)', 'lzm-lead-button' ) }
                            value={ messageSuffix }
                            onChange={ ( val ) => setAttributes( { messageSuffix: val } ) }
                            help={ __( 'e.g. ", I would like a quote."', 'lzm-lead-button' ) }
                        />
                    </PanelBody>             
                    
                </InspectorControls>

                {/* Visual Editor Content */}
                <button 
                    className="lzm-lead-button-trigger"
                    type="button"    
                    style={ buttonStyles } 
                >
                    {/* Icon Rendering Logic */}
                    { iconVariant !== 'none' && (
                        iconVariant === 'solid' ? (                        
                            <svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                viewBox="0 0 16 16" 
                                fill="currentColor"
                                aria-hidden="true"                    
                            >
                                <path d="M13.95 4.24C11.86 1 7.58.04 4.27 2.05C1.04 4.06 0 8.44 2.09 11.67l.17.26l-.7 2.62l2.62-.7l.26.17c1.13.61 2.36.96 3.58.96c1.31 0 2.62-.35 3.75-1.05c3.23-2.1 4.19-6.39 2.18-9.71Zm-1.83 6.74c-.35.52-.79.87-1.4.96c-.35 0-.79.17-2.53-.52c-1.48-.7-2.71-1.84-3.58-3.15c-.52-.61-.79-1.4-.87-2.19c0-.7.26-1.31.7-1.75c.17-.17.35-.26.52-.26h.44c.17 0 .35 0 .44.35c.17.44.61 1.49.61 1.58c.09.09.05.76-.35 1.14c-.22.25-.26.26-.17.44c.35.52.79 1.05 1.22 1.49c.52.44 1.05.79 1.66 1.05c.17.09.35.09.44-.09c.09-.17.52-.61.7-.79c.17-.17.26-.17.44-.09l1.4.7c.17.09.35.17.44.26c.09.26.09.61-.09.87Z" />
                            </svg>
                        ) : (                        
                            <svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                viewBox="0 0 24 24" 
                                fill="currentColor"
                                aria-hidden="true"                    
                            >
                                <path d="M19.05 4.91A9.82 9.82 0 0 0 12.04 2c-5.46 0-9.91 4.45-9.91 9.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21c5.46 0 9.91-4.45 9.91-9.91c0-2.65-1.03-5.14-2.9-7.01m-7.01 15.24c-1.48 0-2.93-.4-4.2-1.15l-.3-.18l-3.12.82l.83-3.04l-.2-.31a8.26 8.26 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24c2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.83c.02 4.54-3.68 8.23-8.22 8.23m4.52-6.16c-.25-.12-1.47-.72-1.69-.81c-.23-.08-.39-.12-.56.12c-.17.25-.64.81-.78.97c-.14.17-.29.19-.54.06c-.25-.12-1.05-.39-1.99-1.23c-.74-.66-1.23-1.47-1.38-1.72c-.14-.25-.02-.38.11-.51c.11-.11.25-.29.37-.43s.17-.25.25-.41c.08-.17.04-.31-.02-.43s-.56-1.34-.76-1.84c-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31c-.22.25-.86.85-.86 2.07s.89 2.4 1.01 2.56c.12.17 1.75 2.67 4.23 3.74c.59.26 1.05.41 1.41.52c.59.19 1.13.16 1.56.1c.48-.07 1.47-.6 1.67-1.18c.21-.58.21-1.07.14-1.18s-.22-.16-.47-.28" />
                            </svg>
                        )
                    )}
                    
                    <span>{ buttonText || __('WhatsApp Button', 'lzm-lead-button') }</span>
                </button>			
            </div>
        </>
	);
}