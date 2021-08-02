import NovoLeilao from '@/views/NovoLeilao.vue'
import { mount } from '@vue/test-utils'
import { createLeilao } from '@/http'

jest.mock('@/http')

const $router = {
  push: jest.fn()
}

describe('A new auction must be created', () => {
  test('With a fulled form an auction must be created',  () => {
    createLeilao.mockResolvedValueOnce()

    const wrapper = mount(NovoLeilao, {
      mocks: {
        $router
      }
    })

    wrapper.find('.produto').setValue('Polaroid')
    wrapper.find('.descricao').setValue('Camera com filme')
    wrapper.find('.valor').setValue(400)
    wrapper.find('form').trigger('submit')

    expect(createLeilao).toHaveBeenCalled()
  })
})


// on the form submit has a router redirection
// but we need to only test our component
// so is necessary the dubbing of the component
