import { mount } from 'vue-test-utils'

import addNewLink from './components/addNewLink'

describe('addNewLink', () => {
    it('is a vue instance', () => {
        const wrapper = mount(addNewLink);
        expect(wrapper.isVueInstance()).toBeTruthy();
    })
})

it('Click on delete button calling my method with argument "clickSave"', async () => {
    const spy = sinon.spy()
    const wrapper = mount(addNewLink, {
      propsData: {
        clickSave: spy
      }
    })
    await wrapper.find('button.clickSave').trigger('click')
  
    spy.should.have.been.calledWith('clickSave')
  })