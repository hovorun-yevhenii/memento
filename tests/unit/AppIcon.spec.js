import { mount } from '@vue/test-utils';
import AppIcon from '@/components/AppIcon.vue';

describe('AppIcon.vue', () => {
  it('renders a svg', () => {
    const wrapper = mount(AppIcon,{
      propsData: {
        type: 'color'
      }
    });

    expect(wrapper.contains('svg')).toBe(true);
  });
});
