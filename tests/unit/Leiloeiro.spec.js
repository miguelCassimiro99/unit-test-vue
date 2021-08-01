import Leiloeiro from '@/views/Leiloeiro.vue'
import { mount } from '@vue/test-utils'
import { getLeilao, getLances } from '@/http'

describe('Auctioneer initiates a auction with no one bid yet', () => {
  test('Alert when do not exists bids', () => {
    const wrapper = mount(Leiloeiro, {
      propsData: {
        id: 1
      }
    })

    const alerta = wrapper.find('.alert-dark')

    expect(alerta.exists()).toBe(true)
  })
})

