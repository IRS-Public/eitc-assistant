import React from 'react';
import { mount } from 'enzyme';
import OfficialSiteBanner from './OfficialSiteBanner';

describe('OfficialSiteBanner', () => {
  let props;
  let mountedOfficialSiteBanner;

  const wrapper = () => {
    if (!mountedOfficialSiteBanner) {
      mountedOfficialSiteBanner = mount(
        <OfficialSiteBanner {...props} />
      );
    }
    return mountedOfficialSiteBanner;
  };

  beforeEach(() => {
    props = {
      fluid: undefined,
    };
    mountedOfficialSiteBanner = undefined;
  });

  it("renders a header", () => {
      // const header = wrapper().render().length;
      expect(wrapper().render().length).toBeGreaterThan(0);
    });

  it("renders a `div`", () => {
    expect(wrapper().contains(div)).toBe(true);
  });

  describe("the rendered div", () => {
    beforeEach(() => {
      props.fluid = true;
    });

    it("is passed the fluid prop", () => {
      expect(wrapper().prop('fluid')).toBe(true);
    });
  });

});
