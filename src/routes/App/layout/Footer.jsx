import React from 'react'
import styles from './Footer.less'
import { footer } from '@/config'

export default () => <div className={styles.footer} dangerouslySetInnerHTML={{ __html: footer }} /> 