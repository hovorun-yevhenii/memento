import { shallowMount } from '@vue/test-utils';
import ColorInput from '@/components/ColorInput.vue';

describe('ColorInput', () => {
  const wrapper = shallowMount(ColorInput);

  it('Shows picker on mouseenter', () => {
    wrapper.trigger('mouseenter');
    expect(wrapper.vm.$data.showColorPicker).toBe(true);
    expect(wrapper.contains('.picker__color')).toBeTruthy();
  });

  it('Emits change event', () => {
    wrapper.find('.picker__color').trigger('click');
    expect(wrapper.emitted().change).toBeTruthy();
  });
});
