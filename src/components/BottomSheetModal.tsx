import { useTheme } from '@/src/theme/ThemeProvider';
import {
  BottomSheetBackdrop,
  BottomSheetFooterProps,
  BottomSheetModal,
  BottomSheetScrollView,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import React, { forwardRef, useCallback, useMemo } from 'react';
import { ScaledSheet } from 'react-native-size-matters';

export type Ref = BottomSheetModal;

interface BottomSheetModalProps {
  children: React.ReactNode;
  snapPoints?: string[];
  index?: number;
  enableContentPanningGesture?: boolean;
  enablePanDownToClose?: boolean;
  backdropPressBehavior?: 'none' | 'close' | 'collapse';
  scrollable?: boolean;
  isDarkBg?: boolean;
  raw?: boolean;
  keyboardBehavior?: 'extend' | 'interactive' | 'fillParent';
  keyboardBlurBehavior?: 'none' | 'restore';
  footerComponent?: React.FC<BottomSheetFooterProps>;
}

const BottomSheet = forwardRef<Ref, BottomSheetModalProps>((props, ref) => {
  const { children, isDarkBg } = props;
  const { theme } = useTheme();
  const snapPoints = useMemo(() => props.snapPoints || ['50%', '75%'], [props.snapPoints]);
  const index = props.index ?? snapPoints.length - 1;

  const pressBehavior = props.backdropPressBehavior ?? 'close';

  const renderBackdrop = useCallback(
    (backdropProps: any) => (
      <BottomSheetBackdrop {...backdropProps} pressBehavior={pressBehavior} />
    ),
    [pressBehavior],
  );

  return (
    <BottomSheetModal
      ref={ref}
      index={index}
      snapPoints={snapPoints}
      enablePanDownToClose={props.enablePanDownToClose ?? true}
      enableContentPanningGesture={props.enableContentPanningGesture ?? true}
      backdropComponent={renderBackdrop}
      footerComponent={props.footerComponent}
      keyboardBehavior={props.keyboardBehavior}
      keyboardBlurBehavior={props.keyboardBlurBehavior}
      backgroundStyle={{
        backgroundColor: isDarkBg ? '#1E2521' : theme.surface,
      }}
      handleIndicatorStyle={{
        backgroundColor: '#D9D9D9',
      }}
    >
      {props.raw ? (
        children
      ) : props.scrollable ? (
        <BottomSheetScrollView style={styles.contentContainer} showsVerticalScrollIndicator={false}>
          {children}
        </BottomSheetScrollView>
      ) : (
        <BottomSheetView style={styles.contentContainer}>{children}</BottomSheetView>
      )}
    </BottomSheetModal>
  );
});

BottomSheet.displayName = 'BottomSheet';

export default BottomSheet;

const styles = ScaledSheet.create({
  contentContainer: {
    flex: 1,
  },
});
