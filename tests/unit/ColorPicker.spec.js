import { shallowMount } from '@vue/test-utils';
import ColorInput from '@/components/ColorInput.vue';

describe('ColorInput', () => {
  it('', () => {
    const wrapper = shallowMount(ColorInput);

    wrapper.trigger('mouseenter');
    expect(wrapper.vm.$data.showColorPicker).toBe(true);
    expect(wrapper.contains('.picker__color')).toBeTruthy();

    wrapper.find('.picker__color').trigger('click');
    expect(wrapper.emitted().change).toBeTruthy();
  });
});
