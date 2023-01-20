import { describe, it, expect, beforeEach } from 'vitest'

import { mount } from '@vue/test-utils'
import VueMultiselect from '../VueMultiselect.vue'

describe('VueMultiselect', () => {
  it('renders options when menu opened', async () => {
    const wrapper = mount(VueMultiselect, {
      props: { options: ["test"], selected: [] }
    })

    await wrapper.find('#vue-multiselect').trigger('click')

    expect(wrapper.text()).toContain("test")
  })
  it('emits event when option selected', async () => {
    const options: string[] = ["word", "another word"]
    const wrapper = mount(VueMultiselect, {
      props: { options: options, selected: [] }
    })

    await wrapper.find('#vue-multiselect').trigger('click')
    await wrapper.find('#select-button-0').trigger('click')

    expect(wrapper.emitted().update).toBeTruthy()
    expect(wrapper.emitted().update[0]).toEqual([[options[0]]])
  })
  it('emits event when option removed', async () => {
    const selected: string[] = ["verylongword"]
    const wrapper = mount(VueMultiselect, {
      props: { options: [], selected: selected }
    })

    await wrapper.find('#remove-button-0').trigger('click')

    expect(wrapper.emitted().update).toBeTruthy()
    expect(wrapper.emitted().update[0]).toEqual([[]])
  })
  it('renders selected option as a tag', async () => {
    const selected: string[] = ["verylongword"]
    const wrapper = mount(VueMultiselect, {
      props: { options: [], selected: selected }
    })

    expect(wrapper.text()).toContain("verylongword")
  })
})
