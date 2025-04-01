const React = require('react');

module.exports = {
  Swiper: ({ children, ...props }) => React.createElement('div', { ...props, 'data-testid': 'swiper' }, children),
  SwiperSlide: ({ children, ...props }) => React.createElement('div', { ...props, 'data-testid': 'swiper-slide' }, children),
  useSwiper: () => ({
    slidePrev: jest.fn(),
    slideNext: jest.fn(),
  }),
  Navigation: jest.fn(),
  Autoplay: jest.fn(),
}; 