import Leiloeiro from '@/views/Leiloeiro.vue'
import { mount } from '@vue/test-utils'
import { getLeilao, getLances } from '@/http'
import flushPromises from 'flush-promises'

jest.mock('@/http')

const leilao = {
  produto: 'Uma mesa',
  lanceInicial: 49,
  descricao: 'Uma bancada para estudo'
}

const lances = [
  {
    id: 1,
    valor: 1001,
    data: '2020-06-13T18:04:26.826Z',
    leilao_id: 1
  },
  {
    valor: 1005,
    data: '2020-06-13T18:04:26.826Z',
    leilao_id: 1,
    id: 2
  },
  {
    valor: 1099,
    data: '2020-06-13T18:19:44.871Z',
    leilao_id: 1,
    id: 3
  }
]

describe('Auctioneer initiates a auction with no one bid yet', () => {
  test('Alert when do not exists bids', async () => {
    getLeilao.mockResolvedValueOnce(leilao)
    getLances.mockResolvedValueOnce([])
    const wrapper = mount(Leiloeiro, {
      propsData: {
        id: 1
      }
    })

    await flushPromises()

    const alerta = wrapper.find('.alert-dark')

    expect(alerta.exists()).toBe(true)
  })
})
describe('An auctioneer shows the existents bids', () => {
  test('Do not show the warning of no-bids', async () => {
    getLeilao.mockResolvedValueOnce(leilao)
    getLances.mockResolvedValueOnce(lances)

    const wrapper = mount(Leiloeiro, {
      propsData: {
        id: 1
      }
    })

    await flushPromises()

    const alerta = wrapper.find('.alert-dark')
    expect(alerta.exists()).toBe(false)
  })

  test('Have a bids list', async () => {
    getLeilao.mockResolvedValueOnce(leilao)
    getLances.mockResolvedValueOnce(lances)

    const wrapper = mount(Leiloeiro, {
      propsData: {
        id: 1
      }
    })

    await flushPromises()
    const lista = wrapper.find('.list-inline')
    expect(lista.exists()).toBe(true)
  })
})

describe('The auctioneer communicates the lower and higher bids', () => {
  test('Show the higher bid of that auction', async () => {
    getLeilao.mockResolvedValueOnce(leilao)
    getLances.mockResolvedValueOnce(lances)

    const wrapper = mount(Leiloeiro, {
      propsData: {
        id: 1
      }
    })
    await flushPromises()
    const maiorLance = wrapper.find('.maior-lance').element
    expect(maiorLance.textContent).toContain('Maior lance: R$ 1099')
  })

  test('Show the lower bid of that auction', async () => {
    getLeilao.mockResolvedValueOnce(leilao)
    getLances.mockResolvedValueOnce(lances)
    const wrapper = mount(Leiloeiro, {
      propsData: {
        id: 1
      }
    })
    await flushPromises()
    const menorLance = wrapper.find('.menor-lance').element
    expect(menorLance.textContent).toContain('Menor lance: R$ 1001')
  })
})

// in this case the component in the mounting uses
// methods that uses a http dependence
// so we need to mock the data that is returned
// when de https's methods are called
// for this i'll use the jest.mock()

// flushPromises:
// used to transform the function in a promise
// used when you need a request response to
// continue the test
