import {mount} from '@vue/test-utils';
import AppIcon from '@/components/AppIcon.vue';

describe('AppIcon', () => {
    const wrapper = mount(AppIcon, {
        propsData: {
            type: 'color',
            big: true,
        },
    });

    it('renders a svg', () => {
        expect(wrapper.vm.big).toBe(true);
        expect(wrapper.contains('path')).toBe(true)
    });

    it('emits click event', () => {
        wrapper.trigger('click');
        expect(wrapper.emitted().click).toBeTruthy();
    });
});
