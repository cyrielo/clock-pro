import React, { PropsWithChildren } from 'react';
import { SafeAreaView, Text, View, Modal, ViewStyle, TouchableOpacity, ModalProps } from 'react-native';
import GestureRecognizer from 'react-native-swipe-gestures';
import Ionicons from '@react-native-vector-icons/ionicons';

interface ModalConfig {
  title: string;
  showFooter: boolean;
  confirmationTitle: string;
};


type modalProps = PropsWithChildren<{
  config?: ModalConfig | null,
  visibility?: boolean;
  hasBack?: boolean;
  footer?: JSX.Element;
  FooterStyles?: ViewStyle;
  onModalClose?: () => void;
  onApply?: () => void;
  onClear?: () => void;
  filtersValid?: boolean;
  style?: object;
}> & ModalProps

interface ModalHeaderProps {
  hasBack: boolean;
  title?: string;
  onModalClose: () => void;
}

interface ModelFooterProps {
  confirmationTitle: string;
  onApply?: () => void;
  onClear?: () => void;
  filtersValid?: boolean;
}

const ModalHeader = ({ title, onModalClose, hasBack }: ModalHeaderProps) => {
  return (
    <GestureRecognizer
      onSwipeDown={(pan) => {
        if (pan.dy > 100) onModalClose();
      }}
      style={{
        borderBottomWidth: 1,
        borderBottomColor: '#b8b8b8',
        width: '100%',
        position: 'absolute',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        top: 0,
        paddingHorizontal: 20,
        paddingVertical: 10,
      }}>
      <TouchableOpacity onPress={onModalClose}>
        {hasBack ? <Ionicons name='chevron-back-outline' size={28} /> : <Ionicons name='close-outline' size={28} />}
      </TouchableOpacity>
      <Text style={{
        textAlign: 'center',
        fontWeight: '600'
      }}>
        {title}
      </Text>
      <View />
    </GestureRecognizer>
  );
}

const ModalFooter = ({
  confirmationTitle,
  filtersValid,
  onApply,
  onClear
}: ModelFooterProps) => {
  return (
    <View style={{
      borderTopWidth: 1,
      borderTopColor: '#b8b8b8',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '100%',
      paddingHorizontal: 20,
      paddingVertical: 10,
      position: 'absolute',
      bottom: 0
    }}>
      <TouchableOpacity
        onPress={() => onClear ? onClear() : null}>
        <Text
          style={{
            fontSize: 16,
            textDecorationLine: 'underline'
          }}>
          Clear
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          backgroundColor: 'black',
          borderRadius: 5,
          paddingVertical: 10,
          paddingHorizontal: 15
        }}
        disabled={!filtersValid}
        onPress={() => onApply ? onApply() : null}
      >
        <Text style={{
          fontSize: 16,
          color: '#e8e8e8'
        }}>
          {confirmationTitle || 'Apply'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

export default ({
  config, visibility, onModalClose, style,
  hasBack = false, footer, FooterStyles,
  filtersValid, onApply, onClear, children }: modalProps) => {
  return (
    <View>
      <Modal
        animationType="slide"
        visible={visibility}
        presentationStyle={'pageSheet'}
        style={{}}
        onRequestClose={() => {
          onModalClose ? onModalClose() : null;
        }}
      >
        <SafeAreaView style={{
          justifyContent: 'center',
          position: 'relative',
          bottom: -10,
          ...style
        }}>
          <View style={{
            backgroundColor: '#fff',
            width: '100%',
            height: '100%'
          }}>
            <ModalHeader
              hasBack={hasBack}
              onModalClose={() => onModalClose ? onModalClose() : null}
              title={config?.title} />
            <View style={{
              marginTop: 60,
              marginBottom: (config && config.showFooter ? 60 : 0),
              marginHorizontal: 20
            }}>
              {children}
            </View>
            {config && config.showFooter && !footer && (
              <ModalFooter
                filtersValid={filtersValid}
                onApply={onApply}
                onClear={onClear}
                confirmationTitle={config.confirmationTitle} />
            )
            }
            {footer ? (
              <View
                style={{
                  borderTopWidth: 1,
                  borderTopColor: '#b8b8b8',
                  width: '100%',
                  paddingHorizontal: 20,
                  paddingVertical: 10,
                  position: 'absolute',
                  bottom: 0,
                  ...FooterStyles
                }}>
                {footer}
              </View>
            ) : null}
          </View>
        </SafeAreaView>
      </Modal>
    </View>
  );
};