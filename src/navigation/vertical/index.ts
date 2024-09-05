import type { VerticalNavItems } from '@layouts/types'
import dashboard from './dashboard'
import inventory from './inventory'

export default [...dashboard, ...inventory] as VerticalNavItems
