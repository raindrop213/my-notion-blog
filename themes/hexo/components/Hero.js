// import Image from 'next/image'
import { useEffect, useState } from 'react'
import Typed from 'typed.js'
import CONFIG from '../config'
import NavButtonGroup from './NavButtonGroup'
import { useGlobal } from '@/lib/global'
import LazyImage from '@/components/LazyImage'
import { siteConfig } from '@/lib/config'

let wrapperTop = 0

/**
 * 顶部全屏大图
 * @returns
 */
const Hero = props => {
  const [typed, changeType] = useState()
  const { siteInfo } = props
  const { locale } = useGlobal()
  const scrollToWrapper = () => {
    window.scrollTo({ top: wrapperTop, behavior: 'smooth' })
  }
  const GREETING_WORDS = siteConfig('GREETING_WORDS').split(',')
  useEffect(() => {
    updateHeaderHeight()

    if (!typed && window && document.getElementById('typed')) {
      changeType(
        new Typed('#typed', {
          strings: GREETING_WORDS,
          typeSpeed: 120,
          backSpeed: 50,
          backDelay: 300,
          showCursor: true,
          smartBackspace: true
        })
      )
    }

    window.addEventListener('resize', updateHeaderHeight)
    return () => {
      window.removeEventListener('resize', updateHeaderHeight)
    }
  })

  function updateHeaderHeight() {
    requestAnimationFrame(() => {
      const wrapperElement = document.getElementById('wrapper')
      wrapperTop = wrapperElement?.offsetTop
    })
  }

  return (
        <header
            id="header" style={{ zIndex: 1 }}
            className="w-full h-screen relative bg-black"
        >

            <div className="text-white absolute bottom-0 flex flex-col h-full items-center justify-center w-full ">
                {/* 站点标题 */}
                <div className='font-black text-4xl md:text-5xl shadow-text'>{siteConfig('TITLE')}</div>
                {/* 站点欢迎语 */}
                <div className='mt-2 h-12 items-center text-center font-medium shadow-text text-lg'>
                    <span id='typed' />
                </div>

                {/* 首页导航大按钮 */}
                {siteConfig('HEXO_HOME_NAV_BUTTONS', null, CONFIG) && <NavButtonGroup {...props} />}

                {/* 滚动按钮 */}
                <div onClick={scrollToWrapper} className="z-10 cursor-pointer w-full text-center py-4 text-3xl absolute bottom-10 text-white">
                    <div className="opacity-70 animate-bounce text-xs">{siteConfig('HEXO_SHOW_START_READING', null, CONFIG) && locale.COMMON.START_READING}</div>
                    <i className='opacity-70 animate-bounce fas fa-angle-down' />
                </div>
            </div>

            <LazyImage id='header-cover' src={siteInfo?.pageCover}
                className={`header-cover w-full h-screen object-cover object-center ${siteConfig('HEXO_HOME_NAV_BACKGROUND_IMG_FIXED', null, CONFIG) ? 'fixed' : ''}`} />

        </header>
  )
}

export default Hero
