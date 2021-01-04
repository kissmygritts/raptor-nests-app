export default {
  visit_date: {
    name: 'visit_date',
    label: 'Visit Date',
    type: 'date',
    value: null
  },
  observers: {
    name: 'observers',
    label: 'Observers',
    helptext: 'Name of observer(s). If there are multiple observers separate by a semi-colon (;).',
    placeholder: 'Mackenzie Jeffress; Kristy Klinger',
    type: 'text',
    value: null
  },
  agency: {
    name: 'agency',
    label: 'Agency',
    type: 'text',
    value: null
  },
  survey_type: {
    name: 'survey_type',
    label: 'Survey Type',
    helptext: 'Select the best option for the type of survey.',
    type: 'select',
    value: null
  },
  source: {
    name: 'source',
    label: 'Source',
    helptext: 'Description of the data source, project, and/or references. For example "2019 NDOW goshawk broadcast survey data form". Leave blank if not noted.',
    type: 'text',
    value: null
  },
  nest_condition: {
    name: 'nest_condition',
    label: 'Nest Condition',
    helptext: 'What is the general condition of the nest. Leave blank if not noted',
    type: 'select',
    options: ['Deteriorating', 'Destroyed', 'Intact', 'Not found'],
    value: null
  },
  nest_size: {
    name: 'nest_size',
    label: 'Nest Size',
    helptext: 'If this is a stick nest, what is the approximate size of the nest',
    type: 'select',
    options: ['Small', 'Medium', 'Large', 'Extra large'],
    value: null
  },
  decorations: {
    name: 'decorations',
    label: 'Are there nest decorations?',
    type: 'radio',
    options: ['Yes', 'No'],
    value: null
  }
}
