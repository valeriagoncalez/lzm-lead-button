<?php
/**
 * Render - lzm WhatsApp Lead
 * Text Domain: 'lzm-lead-button'
 * * @package LZMLeadButton
 */

if ( ! defined( 'ABSPATH' ) ) exit;

/**
 * We use call_user_func to create a local scope (IIFE). 
 */
call_user_func( function( $attributes ) {

	$lzm_allowed_svg_tags = array(
		'svg'  => array(
			'xmlns'       => true,
			'viewbox'     => true,
			'viewBox'     => true,
			'fill'        => true,
			'width'       => true,
			'height'      => true,
			'class'       => true,
			'aria-hidden' => true,
			'role'        => true,
		),
		'path' => array(
			'd'    => true,
			'fill' => true,
		),
		'g'    => array(
			'fill' => true,
		),
	);


	// --- Initialization & IDs ---
	$lzm_unique_block_id = 'lzm-' . uniqid();   


	// --- Color ---
	$lzm_bg_color_value = '#25d366';

	if ( ! empty( $attributes['style']['color']['background'] ) ) {
		$lzm_bg_color_value = $attributes['style']['color']['background'];

	} elseif ( ! empty( $attributes['backgroundColor'] ) ) {
		$lzm_bg_color_value = "var(--wp--preset--color--{$attributes['backgroundColor']})";
	}

	$lzm_overlay_color = ! empty( $attributes['overlayColor'] ) 
		? $attributes['overlayColor'] 
		: 'rgba(0, 0, 0, 0.7)';

    $lzm_modal_bg = ! empty( $attributes['modalBackgroundColor'] ) 
        ? $attributes['modalBackgroundColor'] 
        : '#ffffff';

    $lzm_modal_text = ! empty( $attributes['modalTextColor'] ) 
        ? $attributes['modalTextColor'] 
        : '#1f2937';

    $lzm_modal_btn_bg = ! empty( $attributes['modalBtnColor'] ) 
        ? $attributes['modalBtnColor'] 
        : '#25d366';

    $lzm_modal_btn_text = ! empty( $attributes['modalBtnTextColor'] ) 
        ? $attributes['modalBtnTextColor'] 
        : '#ffffff';

    $lzm_modal_btn_b_color = ! empty( $attributes['modalBtnBorderColor'] ) 
        ? $attributes['modalBtnBorderColor'] 
        : 'transparent';    


    // --- Typography ---
    $lzm_font_size_btn = '1.4rem';

    if ( ! empty( $attributes['fontSize'] ) ) {       
        $lzm_font_size_btn = "var(--wp--preset--font-size--{$attributes['fontSize']})";

    } elseif ( ! empty( $attributes['style']['typography']['fontSize'] ) ) {
        $lzm_font_size_btn = $attributes['style']['typography']['fontSize'];        
    }

    $lzm_font_weight = '600';

    if ( ! empty( $attributes['style']['typography']['fontWeight'] ) ) {
        $lzm_font_weight = $attributes['style']['typography']['fontWeight'];
    }

    $lzm_text_transform = ! empty( $attributes['style']['typography']['textTransform'] ) 
        ? $attributes['style']['typography']['textTransform'] 
        : 'inherit';

    $lzm_letter_spacing = ! empty( $attributes['style']['typography']['letterSpacing'] ) 
        ? $attributes['style']['typography']['letterSpacing'] 
        : 'inherit';

    $lzm_text_decoration = ! empty( $attributes['style']['typography']['textDecoration'] ) 
        ? $attributes['style']['typography']['textDecoration'] 
        : 'inherit';


	// --- Dimensions & Styles ---
	$lzm_width_value = ! empty( $attributes['maxWidth'] ) 
		? $attributes['maxWidth'] 
		: '100%';

	$lzm_icon_size = ! empty( $attributes['iconSize'] ) 
		? $attributes['iconSize'] 
		: '24px';

	$lzm_icon_variant = ! empty( $attributes['iconVariant'] ) 
		? $attributes['iconVariant'] 
		: 'outline';

	$lzm_modal_icon_variant = ! empty( $attributes['modalIconVariant'] ) 
		? $attributes['modalIconVariant'] 
		: 'none';


    // --- Padding ---
    $lzm_padding_top    = '10px';
    $lzm_padding_right  = '10px';
    $lzm_padding_bottom = '10px';
    $lzm_padding_left   = '10px';

    $lzm_fix_spacing = function( $value ) {
        if ( is_string( $value ) && strpos( $value, 'var:preset|spacing|' ) !== false ) {
            $slug = str_replace( 'var:preset|spacing|', '', $value );
            return "var(--wp--preset--spacing--{$slug})";
        }
        return $value;
    };

    if ( ! empty( $attributes['style']['spacing']['padding'] ) ) {
        $lzm_padding_raw = $attributes['style']['spacing']['padding'];

        if ( is_array( $lzm_padding_raw ) ) {            
            $lzm_padding_top    = ! empty( $lzm_padding_raw['top'] )    ? $lzm_fix_spacing( $lzm_padding_raw['top'] )    : '0px';
            $lzm_padding_right  = ! empty( $lzm_padding_raw['right'] )  ? $lzm_fix_spacing( $lzm_padding_raw['right'] )  : '0px';
            $lzm_padding_bottom = ! empty( $lzm_padding_raw['bottom'] ) ? $lzm_fix_spacing( $lzm_padding_raw['bottom'] ) : '0px';
            $lzm_padding_left   = ! empty( $lzm_padding_raw['left'] )   ? $lzm_fix_spacing( $lzm_padding_raw['left'] )   : '0px';

        } else {           
            $fixed_val = $lzm_fix_spacing( $lzm_padding_raw );
            $lzm_padding_top    = $fixed_val;
            $lzm_padding_right  = $fixed_val;
            $lzm_padding_bottom = $fixed_val;
            $lzm_padding_left   = $fixed_val;
        }
    }

    $lzm_padding = "{$lzm_padding_top} {$lzm_padding_right} {$lzm_padding_bottom} {$lzm_padding_left}";
    
    
    // --- Margins - Left - Right ---
    $lzm_alignment = ! empty( $attributes['buttonAlignment'] ) ? $attributes['buttonAlignment'] : 'left';
    
    $lzm_margin_left  = '0px'; 
    $lzm_margin_right = '0px';

    switch ( $lzm_alignment ) {
        case 'center':
            $lzm_margin_left  = 'auto';
            $lzm_margin_right = 'auto';
            break;
        case 'right':
            $lzm_margin_left  = 'auto';
            $lzm_margin_right = '0px';
            break;
        default: 
            $lzm_margin_left  = '0px';
            $lzm_margin_right = 'auto';
            break;
    }


    // --- Block Gap  ---
    $lzm_gap_value = '16px';

    if ( ! empty( $attributes['style']['spacing']['blockGap'] ) ) {
        $lzm_gap_raw = $attributes['style']['spacing']['blockGap'];
        
        if ( is_string( $lzm_gap_raw ) && strpos( $lzm_gap_raw, 'var:preset|spacing|' ) !== false ) {
            $slug = str_replace( 'var:preset|spacing|', '', $lzm_gap_raw );
            $lzm_gap_value = "var(--wp--preset--spacing--{$slug})";

        } else {            
            $lzm_gap_value = $lzm_gap_raw;
        }
    }


    // --- Border & Radius ---
    $lzm_radius = '5px';
    
    if ( ! empty( $attributes['style']['border']['radius'] ) ) {
        $raw_radius = $attributes['style']['border']['radius'];        
       
        if ( is_array( $raw_radius ) ) {
            $tl = ! empty( $raw_radius['topLeft'] ) ? $raw_radius['topLeft'] : '0px';
            $tr = ! empty( $raw_radius['topRight'] ) ? $raw_radius['topRight'] : '0px';
            $br = ! empty( $raw_radius['bottomRight'] ) ? $raw_radius['bottomRight'] : '0px';
            $bl = ! empty( $raw_radius['bottomLeft'] ) ? $raw_radius['bottomLeft'] : '0px';        
            
            $lzm_radius = "{$tl} {$tr} {$br} {$bl}";

        } else {            
            $lzm_radius = $raw_radius;
        }
    }

    $lzm_border_top    = '0px';
    $lzm_border_right  = '0px';
    $lzm_border_bottom = '0px';
    $lzm_border_left   = '0px';

    if ( ! empty( $attributes['style']['border']['width'] ) ) {
        $raw_width = $attributes['style']['border']['width'];

        if ( is_array( $raw_width ) ) {            
            $lzm_border_top    = ! empty( $raw_width['top'] ) ? $raw_width['top'] : '0px';
            $lzm_border_right  = ! empty( $raw_width['right'] ) ? $raw_width['right'] : '0px';
            $lzm_border_bottom = ! empty( $raw_width['bottom'] ) ? $raw_width['bottom'] : '0px';
            $lzm_border_left   = ! empty( $raw_width['left'] ) ? $raw_width['left'] : '0px';

        } else {           
            $lzm_border_top = $lzm_border_right = $lzm_border_bottom = $lzm_border_left = $raw_width;
        }
    }

    $lzm_border_style = ! empty( $attributes['style']['border']['style'] ) 
        ? $attributes['style']['border']['style'] 
        : 'none';

    if ( $lzm_border_style === 'none' ) {
        if ( $lzm_border_top !== '0px' || $lzm_border_bottom !== '0px' || $lzm_border_right !== '0px' || $lzm_border_left !== '0px' ) {
            $lzm_border_style = 'solid';
        }
    }

    $lzm_border_color = 'transparent';

    if ( ! empty( $attributes['style']['border']['color'] ) ) {
        $raw_color = $attributes['style']['border']['color'];        
        
        if ( is_array( $raw_color ) ) {
            $ct = ! empty( $raw_color['top'] ) ? $raw_color['top'] : $lzm_border_color;
            $cr = ! empty( $raw_color['right'] ) ? $raw_color['right'] : $lzm_border_color;
            $cb = ! empty( $raw_color['bottom'] ) ? $raw_color['bottom'] : $lzm_border_color;
            $cl = ! empty( $raw_color['left'] ) ? $raw_color['left'] : $lzm_border_color;            
            
            $lzm_border_color = "$ct $cr $cb $cl";

        } else {           
            $lzm_border_color = $raw_color;
        }

    } elseif ( ! empty( $attributes['borderColor'] ) ) {       
        $lzm_border_color = "var(--wp--preset--color--{$attributes['borderColor']})";
    }


    // --- Shadow ---
    $lzm_box_shadow = 'none';

    if ( ! empty( $attributes['style']['shadow'] ) ) {
        $raw_shadow = $attributes['style']['shadow'];
        
        if ( strpos( $raw_shadow, 'var:preset|shadow|' ) !== false ) {
            $slug = str_replace( 'var:preset|shadow|', '', $raw_shadow );
            $lzm_box_shadow = "var(--wp--preset--shadow--{$slug})";

        } else {            
            $lzm_box_shadow = $raw_shadow;
        }
    }

  
	// --- Texts & Translations ---
	$lzm_message_prefix = ! array_key_exists( 'messagePrefix', $attributes ) 
		? __( 'Hello, my name is', 'lzm-lead-button' ) 
		: $attributes['messagePrefix'];

	$lzm_message_suffix = isset( $attributes['messageSuffix'] ) 
		? trim( $attributes['messageSuffix'] ) 
		: '';

	$lzm_trigger_button_text = ! empty( $attributes['buttonText'] ) 
		? $attributes['buttonText'] 
		: __( 'WhatsApp Button', 'lzm-lead-button' );

	$lzm_modal_button_text = ! empty( $attributes['modalButtonText'] ) 
		? $attributes['modalButtonText'] 
		: __( 'Start Chat', 'lzm-lead-button' );

	$lzm_input_placeholder = ! empty( $attributes['placeholderText'] ) 
		? $attributes['placeholderText'] 
		: __( 'Your name', 'lzm-lead-button' );    


	// --- Technical Data (IDs & Links) ---    
	$lzm_main_btn_id = isset( $attributes['mainButtonId'] ) 
		? trim( $attributes['mainButtonId'] ) 
		: '';

	$lzm_modal_btn_id = isset( $attributes['modalButtonId'] ) 
		? trim( $attributes['modalButtonId'] ) 
		: '';

	$lzm_phone_clean = isset( $attributes['phoneNumber'] ) 
		? preg_replace( '/[^0-9]/', '', $attributes['phoneNumber'] ) 
		: '';

	$lzm_custom_url = isset( $attributes['customUrl'] ) 
		? trim( $attributes['customUrl'] ) 
		: '';

	$lzm_use_custom = isset( $attributes['useCustomLink'] ) 
		? (bool) $attributes['useCustomLink'] 
		: false;

    $lzm_min_length = ! empty( $attributes['minNameLength'] ) 
    ? intval( $attributes['minNameLength'] ) 
    : 2;

    $lzm_open_in_new_tab = isset( $attributes['openInNewTab'] ) 
		? (bool) $attributes['openInNewTab'] 
		: true;


	// --- Context (Interactivity API) ---    
	$lzm_context = array(
		'blockId'       => $lzm_unique_block_id,
        'minNameLength' => $lzm_min_length,
		'name'          => '',
		'useCustomLink' => $lzm_use_custom,
		'phoneNumber'   => esc_attr( $lzm_phone_clean ),
		'customUrl'     => esc_url( $lzm_custom_url ),
		'messagePrefix' => esc_attr( $lzm_message_prefix ),
		'messageSuffix' => esc_attr( $lzm_message_suffix ),
		'openInNewTab'  => $lzm_open_in_new_tab,    
	);

	$lzm_inline_style = "
		--lzm-bg: {$lzm_bg_color_value}; 
		--lzm-width: {$lzm_width_value}; 
		--lzm-icon-size: {$lzm_icon_size};
		--lzm-overlay-bg: {$lzm_overlay_color};        
        --lzm-modal-bg: {$lzm_modal_bg};
        --lzm-modal-text: {$lzm_modal_text};
        --lzm-modal-btn-bg: {$lzm_modal_btn_bg};
        --lzm-modal-btn-border-color: {$lzm_modal_btn_b_color};
        --lzm-modal-btn-text: {$lzm_modal_btn_text};
        --lzm-btn-font-size: {$lzm_font_size_btn};
        --lzm-font-weight: {$lzm_font_weight};
        --lzm-radius: {$lzm_radius};
        --lzm-border-top: {$lzm_border_top};
        --lzm-border-right: {$lzm_border_right};
        --lzm-border-bottom: {$lzm_border_bottom};
        --lzm-border-left: {$lzm_border_left};       
        --lzm-border-style: {$lzm_border_style};
        --lzm-border-color: {$lzm_border_color};
        --lzm-padding: {$lzm_padding};        
        --lzm-margin-left: {$lzm_margin_left};
        --lzm-margin-right: {$lzm_margin_right};
        --lzm-gap: {$lzm_gap_value};
        --lzm-box-shadow: {$lzm_box_shadow};
        --lzm-text-transform: {$lzm_text_transform};
        --lzm-letter-spacing: {$lzm_letter_spacing};
        --lzm-text-decoration: {$lzm_text_decoration};
	";

	$lzm_wrapper_attributes = get_block_wrapper_attributes(
		array(
			'data-wp-interactive' => 'lzm-lead-button',
			'data-wp-context'     => esc_attr( wp_json_encode( $lzm_context ) ),
			'style'               => $lzm_inline_style,
			'id'                  => $lzm_unique_block_id . '-wrapper'
		)
	);


	// --- SVG Icons ---
	$lzm_icons_map = array(
		'solid' => '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
			<path d="M13.95 4.24C11.86 1 7.58.04 4.27 2.05C1.04 4.06 0 8.44 2.09 11.67l.17.26l-.7 2.62l2.62-.7l.26.17c1.13.61 2.36.96 3.58.96c1.31 0 2.62-.35 3.75-1.05c3.23-2.1 4.19-6.39 2.18-9.71Zm-1.83 6.74c-.35.52-.79.87-1.4.96c-.35 0-.79.17-2.53-.52c-1.48-.7-2.71-1.84-3.58-3.15c-.52-.61-.79-1.4-.87-2.19c0-.7.26-1.31.7-1.75c.17-.17.35-.26.52-.26h.44c.17 0 .35 0 .44.35c.17.44.61 1.49.61 1.58c.09.09.05.76-.35 1.14c-.22.25-.26.26-.17.44c.35.52.79 1.05 1.22 1.49c.52.44 1.05.79 1.66 1.05c.17.09.35.09.44-.09c.09-.17.52-.61.7-.79c.17-.17.26-.17.44-.09l1.4.7c.17.09.35.17.44.26c.09.26.09.61-.09.87Z" />
		</svg>',
		
		'outline' => '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
			<path d="M19.05 4.91A9.82 9.82 0 0 0 12.04 2c-5.46 0-9.91 4.45-9.91 9.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21c5.46 0 9.91-4.45 9.91-9.91c0-2.65-1.03-5.14-2.9-7.01m-7.01 15.24c-1.48 0-2.93-.4-4.2-1.15l-.3-.18l-3.12.82l.83-3.04l-.2-.31a8.26 8.26 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24c2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.83c.02 4.54-3.68 8.23-8.22 8.23m4.52-6.16c-.25-.12-1.47-.72-1.69-.81c-.23-.08-.39-.12-.56.12c-.17.25-.64.81-.78.97c-.14.17-.29.19-.54.06c-.25-.12-1.05-.39-1.99-1.23c-.74-.66-1.23-1.47-1.38-1.72c-.14-.25-.02-.38.11-.51c.11-.11.25-.29.37-.43s.17-.25.25-.41c.08-.17.04-.31-.02-.43s-.56-1.34-.76-1.84c-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31c-.22.25-.86.85-.86 2.07s.89 2.4 1.01 2.56c.12.17 1.75 2.67 4.23 3.74c.59.26 1.05.41 1.41.52c.59.19 1.13.16 1.56.1c.48-.07 1.47-.6 1.67-1.18c.21-.58.21-1.07.14-1.18s-.22-.16-.47-.28" />
		</svg>'
	);

	$lzm_main_icon_svg = isset( $lzm_icons_map[ $lzm_icon_variant ] ) 
		? $lzm_icons_map[ $lzm_icon_variant ] 
		: '';


	$lzm_modal_icon_svg = isset( $lzm_icons_map[ $lzm_modal_icon_variant ] ) 
		? $lzm_icons_map[ $lzm_modal_icon_variant ] 
		: '';

	?>

	<div <?php echo wp_kses_post( $lzm_wrapper_attributes ); ?>>
		<button 
			type="button"
			class="lzm-lead-button-trigger"
			<?php echo ! empty( $lzm_main_btn_id ) ? 'id="' . esc_attr( $lzm_main_btn_id ) . '"' : ''; ?>      
			data-wp-on--click="actions.openModal"
            aria-label="<?php echo ! empty( $lzm_trigger_button_text ) 
                ? esc_attr( $lzm_trigger_button_text ) 
                : esc_attr__( 'Contact via WhatsApp', 'lzm-lead-button' ); ?>"
		>
			<?php echo wp_kses( $lzm_main_icon_svg, $lzm_allowed_svg_tags ); ?>
			<span><?php echo esc_html( $lzm_trigger_button_text ); ?></span>
		</button>
	</div>


	<?php
	// --- Modal (Footer) ---
	add_action( 'wp_footer', function() use ( 
			$attributes, 
			$lzm_context, 
			$lzm_inline_style, 
			$lzm_modal_icon_svg, 
			$lzm_modal_btn_id, 
			$lzm_unique_block_id, 
			$lzm_modal_button_text, 
			$lzm_input_placeholder, 
			$lzm_allowed_svg_tags ) 
		
		{ ?>
		<div
			id="<?php echo esc_attr( $lzm_unique_block_id ); ?>-modal"
			class="lzm-lead-button-overlay lzm-hidden"
			data-wp-interactive="lzm-lead-button"
			data-wp-context="<?php echo esc_attr( wp_json_encode( $lzm_context ) ); ?>"
			data-wp-class--lzm-hidden="!state.isOpen"
			data-wp-on--click="actions.closeModal"
			style="<?php echo esc_attr( $lzm_inline_style ); ?>"
		>
			<div class="lzm-modal" data-wp-on--click="actions.stopProp">
				<h2>
					<?php 
					echo esc_html( 
						! empty( $attributes['modalTitle'] ) 
						? $attributes['modalTitle'] 
						: __( 'Enter your name', 'lzm-lead-button' ) 
					); 
					?>
				</h2>
				
				<input 
					type="text" 
					class="lzm-input-name"                
					maxlength="25"               
					placeholder="<?php echo esc_attr( $lzm_input_placeholder ); ?>"
                    aria-label="<?php echo esc_attr( $lzm_input_placeholder ); ?>"
					data-wp-on--input="actions.updateName"
					data-wp-bind--value="context.name"
				/>
				
				<button 
					type="button"
					class="lzm-send-btn"
                    aria-label="<?php echo ! empty( $lzm_modal_button_text ) 
                        ? esc_attr( $lzm_modal_button_text ) 
                        : esc_attr__( 'Send', 'lzm-lead-button' ); ?>"
					<?php echo ! empty( $lzm_modal_btn_id ) ? 'id="' . esc_attr( $lzm_modal_btn_id ) . '"' : ''; ?>
                    style="text-transform: var(--lzm-text-transform); letter-spacing: var(--lzm-letter-spacing); text-decoration: var(--lzm-text-decoration);"
					data-wp-on--click="actions.sendLead"
					data-wp-bind--disabled="!state.isFormValid"
				>
					<?php echo wp_kses( $lzm_modal_icon_svg, $lzm_allowed_svg_tags ); ?>
					<span><?php echo esc_html( $lzm_modal_button_text ); ?></span>
				</button>
				
				<button 
					type="button" 
					class="lzm-close" 
					data-wp-on--click="actions.closeModal"
					aria-label="<?php echo esc_attr__( 'Close', 'lzm-lead-button' ); ?>"
				>&times;</button>
			</div>
		</div>
	<?php });

}, $attributes );