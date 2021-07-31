import Lance from '@/components/Lance.vue'
import { mount } from '@vue/test-utils'

test('do not accept bet minor than zero', () => {
  const wrapper = mount(Lance)
  const input = wrapper.find('input')
  input.setValue(-100)

  const lancesEmitidos = wrapper.emitted('novo-lance')

  wrapper.trigger('submit')

  // must be undefined because the input value is minor than 0
  expect(lancesEmitidos).toBeUndefined()
})

test('emite um lance quando lance é maior do que zero', () => {
  const wrapper = mount(Lance)
  const input = wrapper.find('input')

  input.setValue(100)

  wrapper.trigger('submit')

  const lancesEmitidos = wrapper.emitted('novo-lance')

  // must be undefined because the input value is minor than 0
  expect(lancesEmitidos).toHaveLength(1)
})

test('valor input é o mesmo do valor do lance', () => {
  const wrapper = mount(Lance)
  const input = wrapper.find('input')
  input.setValue(100)
  // [
  //   [100]
  // ]
  wrapper.trigger('submit')
  const lancesEmitidos = wrapper.emitted('novo-lance')
  const lance = parseInt(lancesEmitidos[0][0])

  expect(lance).toBe(100)
})

// npm run test:unit

// function: test()
// function test receives two arguments
// first: description of what will be tested
// second: function with the test

// wrapper
// using this name because the component is "wrapped" into a const
// seems like packaged

// find

// trigger : dispatch an event
