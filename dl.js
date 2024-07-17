window.dataLayer = window.dataLayer || []
export function headerInteraction(click_text, menu_category, cta_position, page_type) {
  try {
    window.dataLayer.push({
      event: 'header_interaction',
      click_text: click_text,
      menu_category: menu_category || click_text,
      cta_position: cta_position,
      page_type: page_type,
    })
  } catch (error) {
    console.warn(error)
  }
}
export function footerInteraction(click_text, menu_category, cta_position, page_type) {
  try {
    window.dataLayer.push({
      event: 'footer_interaction',
      click_text: click_text,
      menu_category: menu_category || click_text,
      cta_position: 'footer',
      page_type: page_type,
    })
  } catch (error) {
    console.warn(error)
  }
}

export function outboundClick(click_text, menu_category, cta_position, page_type) {
  try {
    window.dataLayer.push({
      event: 'outbound_click',
      click_text: click_text,
      menu_category: menu_category,
      cta_position: cta_position,
      page_type: page_type,
    })
  } catch (error) {
    console.warn(error)
  }
}

export function navlogin(page_type) {
  try {
    window.dataLayer.push({
      event: 'nav_login',
      page_type: page_type,
    })
  } catch (error) {
    console.warn(error)
  }
}

export function ctaClick(click_text, cta_category, cta_position, page_type) {
  try {
    window.dataLayer.push({
      event: 'cta_click',
      click_text: click_text,
      cta_category: cta_category,
      cta_position: cta_position,
      page_type: page_type,
    })
  } catch (error) {
    console.warn(error)
  }
}
export function loignClick(click_text, page_type) {
  try {
    window.dataLayer.push({
      event: 'login',
      click_text: click_text,
      page_type: page_type,
    })
  } catch (error) {
    console.warn(error)
  }
}

export function bannerClick(click_text, page_type) {
  try {
    window.dataLayer.push({
      event: 'banner_click',
      click_text: click_text,
      page_type: page_type,
    })
  } catch (error) {
    console.warn(error)
  }
}

export function resendOtp(click_text, page_type) {
  try {
    window.dataLayer.push({
      event: 'resend_otp',
      click_text: click_text,
      page_type: page_type,
    })
  } catch (error) {
    console.warn(error)
  }
}
export function verifyOtp(click_text, page_type, user_id) {
  try {
    window.dataLayer.push({
      event: 'verify_otp',
      click_text: click_text,
      page_type: page_type,
      user_id: user_id,
    })
  } catch (error) {
    console.warn(error)
  }
}
