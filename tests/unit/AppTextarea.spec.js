import { shallowMount } from '@vue/test-utils'
import AppTextarea from '@/components/AppTextarea.vue'

describe('AppTextarea', () => {
  it('AppTextarea emits change event', () => {
    const wrapper = shallowMount(AppTextarea);

    wrapper.find('textarea').trigger('input');
    expect(wrapper.emitted().change).toBeTruthy();
  });
});
