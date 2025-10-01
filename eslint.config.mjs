// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'

export default withNuxt({
  rules: {
    '@typescript-eslint/no-explicit-any': 'error',
    'vue/attribute-hyphenation': 'error',
    'vue/v-on-event-hyphenation': 'error',
  },
}).append(eslintPluginPrettierRecommended)
