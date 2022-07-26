import {StyleSheet} from 'react-native';
import {getScaleNumber} from '../library/utils';

import colors from '../theme/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.blackColor1,
  },
  countDescriptionText: {
    color: colors.white,
    fontSize: getScaleNumber(24),
    fontWeight: '600',
  },
  countText: {
    fontSize: getScaleNumber(34),
    color: colors.primaryColor,
    textAlignVertical: 'bottom',
    fontWeight: '600',
  },
  text: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: getScaleNumber(10),
  },
  cardContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});

export default styles;
