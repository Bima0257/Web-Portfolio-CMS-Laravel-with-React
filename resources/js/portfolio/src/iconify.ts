import { addCollection } from '@iconify/react'
import type { IconifyJSON } from '@iconify/types'

import logos from '@iconify-json/logos/icons.json'
import devicon from '@iconify-json/devicon/icons.json'
import skillIcons from '@iconify-json/skill-icons/icons.json'

addCollection(logos as IconifyJSON)
addCollection(devicon as IconifyJSON)
addCollection(skillIcons as IconifyJSON)
