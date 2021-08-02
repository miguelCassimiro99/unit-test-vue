import Avaliador from '@/views/Avaliador.vue'
import { mount, RouterLinkStub } from '@vue/test-utils'
import { getLeiloes } from '@/http'
import flushPromises from 'flush-promises'

jest.mock('@/http')

const leiloes = [
  {
    produto: 'Bancada',
    lanceInicial: 100,
    descricao: 'Bancada para escritório'
  },
  {
    produto: 'Armario',
    lanceInicial: 100,
    descricao: 'Armario para quarto'
  }
]

describe('A judge that connects to the API', () => {
  test('Show all the auctions returned by the API', async() => {
    getLeiloes.mockResolvedValueOnce(leiloes)
    const wrapper = mount(Avaliador, {
      stubs: {
        RouterLink: RouterLinkStub
      }
    })
    await flushPromises()
    const totalLeiloesExibidos = wrapper.findAll('.leilao').length
    expect(totalLeiloesExibidos).toBe(leiloes.length)
  })

  test('No one auction is returned by the API ', async() => {
    getLeiloes.mockResolvedValueOnce([])
    const wrapper = mount(Avaliador, {
      stubs: {
        RouterLink: RouterLinkStub
      }
    })
    await flushPromises()
    const totalLeiloesExibidos = wrapper.findAll('.leilao').length
    expect(totalLeiloesExibidos).toBe(0)
  })
})

// in this case its necessary to Stub the RouterLink
// so the vue-test-util brings the RouterLinkStub, that help
// to make this function
// so it just needs to be passsed on the mount of the component
