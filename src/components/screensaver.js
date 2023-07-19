import React from 'react'

import Background from './background'

import styles from '../styles/screensaver.module.css'

const Screensaver = () => {
  return (
    <div className={styles.container}>
        <Background />
        <div className={styles.animation}>
            <h1 className='login-title'>Briqolage</h1>
        </div>
    </div>
  )
}

export default Screensaver