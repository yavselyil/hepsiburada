import { mount } from 'vue-test-utils'
import sinon from 'sinon'

import listPage from './components/listPage'

describe('listPage', () => {
    it('is a vue instance', () => {
        const wrapper = mount(listPage);
        expect(wrapper.isVueInstance()).toBeTruthy();
    })
})

it('Click on delete button calling my method with argument "deleteBtn"', async () => {
    const spy = sinon.spy()
    const wrapper = mount(listPage, {
      propsData: {
        callMe: spy
      }
    })
    await wrapper.find('button.deleteBtn').trigger('click')
  
    spy.should.have.been.calledWith('deleteBtn')
  })