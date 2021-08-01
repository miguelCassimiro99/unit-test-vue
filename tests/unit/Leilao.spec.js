import Leilao from '@/components/Leilao'
import { mount } from '@vue/test-utils'

const leilao = {
  produto: 'Uma mesa',
  lanceInicial: 49,
  descricao: 'Uma bancada para estudo'
}

describe('An auction shows a products data ', () => {
  test('Mount the component with the props passed', () => {
    const wrapper = mount(Leilao, {
      propsData: {
        leilao
      }
    })
    expect(wrapper).toBeTruthy()
  })

  test('Shows audiction data inside card', () => {
    const wrapper = mount(Leilao, {
      propsData: {
        leilao
      }
    })

    const header = wrapper.find('.card-header').element
    const title = wrapper.find('.card-title').element
    const text = wrapper.find('.card-text').element

    expect(header.textContent).toContain(`Estamos leiloando um(a): ${leilao.produto}`)
    expect(title.textContent).toContain(`Lance inicial: R$ ${leilao.lanceInicial}`)
    expect(text.textContent).toContain(leilao.descricao)
    expect(wrapper).toBeTruthy()
  })
})
