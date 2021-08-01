import Lance from '@/components/Lance.vue'
import { mount } from '@vue/test-utils'

describe('A bet without minimum value', () => {
  test('do not accept bet minor than zero', () => {
    const wrapper = mount(Lance)
    const input = wrapper.find('input')
    input.setValue(-100)

    const lancesEmitidos = wrapper.emitted('novo-lance')

    wrapper.trigger('submit')

    // must be undefined because the input value is minor than 0
    expect(lancesEmitidos).toBeUndefined()
  })

  test('emmit a bet when the value is higher than zero', () => {
    const wrapper = mount(Lance)
    const input = wrapper.find('input')

    input.setValue(100)

    wrapper.trigger('submit')

    const lancesEmitidos = wrapper.emitted('novo-lance')

    // must be undefined because the input value is minor than 0
    expect(lancesEmitidos).toHaveLength(1)
  })

  test('Emmits a expected value of a valid bet', () => {
    const wrapper = mount(Lance)
    const input = wrapper.find('input')
    input.setValue(100)
    // [
    //   [100]lance
    // ]
    wrapper.trigger('submit')
    const lancesEmitidos = wrapper.emitted('novo-lance')
    const lance = parseInt(lancesEmitidos[0][0])

    expect(lance).toBe(100)
  })
})

describe('a bet with minimum value', () => {
  test('all bets should have a value higher than the minimum inputed', () => {
    const wrapper = mount(Lance, {
      propsData: {
        lanceMinimo: 300
      }
    })
    const input = wrapper.find('input')

    input.setValue(400)
    wrapper.trigger('submit')

    const lancesEmitidos = wrapper.emitted('novo-lance')

    expect(lancesEmitidos).toHaveLength(1)
  })

  test('Emmits a bet when the ', () => {
    const wrapper = mount(Lance, {
      propsData: {
        lanceMinimo: 300
      }
    })
    const input = wrapper.find('input')
    input.setValue(400)
    wrapper.trigger('submit')
    const lancesEmitidos = wrapper.emitted('novo-lance')

    const lance = parseInt(lancesEmitidos[0][0])

    expect(lance).toBe(400)
  })
  test('do not are accept bets with values minor than the minimum value passed', async () => {
    const wrapper = mount(Lance, {
      propsData: {
        lanceMinimo: 300
      }
    })
    const input = wrapper.find('input')
    input.setValue(100)
    wrapper.trigger('submit')
    await wrapper.vm.$nextTick()

    const msgErro = wrapper.find('p.alert').element.textContent
    const msgEsperada = 'O valor mínimo para o lance é de R$ 300'

    expect(msgErro).toContain(msgEsperada)
  })
})

// npm run test:unit

// function: test()
// function test receives two arguments
// first: description of what will be tested
// second: function with the test

// wrapper:
// using this name because the component is "wrapped" into a const
// seems like packaged

// find

// trigger : dispatch an event


// async render:
// to make a test that needs to watch an element that
// needs to be render after the initial DOM render
// the test function need to be an async function

// vm.$nextTick()
// used to ensure the DOM is updated
