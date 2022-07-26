import React from 'react';
import {render} from '@testing-library/react-native';

import GreetingsComponent from '../game/greetings.component';

describe('GreetingsComponents', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });
  it('should match snapshot', () => {
    const element = render(
      <GreetingsComponent
        buttonText="Try another round"
        title="Congratulations!"
        subtitle={`You win this game by ${0} steps!`}
      />,
    );
    expect(element).toMatchSnapshot();
  });
});
