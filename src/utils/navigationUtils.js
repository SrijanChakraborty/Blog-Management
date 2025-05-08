import { CommonActions, createNavigationContainerRef, StackActions } from '@react-navigation/native';

export const navigationRef = createNavigationContainerRef();

export async function navigate(routeName, params) {
    if (navigationRef.isReady()) {
      navigationRef.dispatch(CommonActions.navigate(routeName, params));
    }
  }
  export async function replace(routeName, params) {
    if (navigationRef.isReady()) {
      navigationRef.dispatch(StackActions.replace(routeName, params));
    }
  }
  export async function resetandNavigate(routeName) {
    if (navigationRef.isReady()) {
      navigationRef.dispatch(CommonActions.reset({
        index: 0,
        routes: [{ name: routeName }],
      }));
    }
  }

  export async function goback() {
    if (navigationRef.isReady()) {
      navigationRef.dispatch(CommonActions.goBack());
    }
  }

  export async function push(routeName, params) {
    if (navigationRef.isReady()) {
      navigationRef.dispatch(StackActions.push(routeName, params));
    }
  }
  export async function prepareNavigation() {
    return navigationRef.isReady();
  }