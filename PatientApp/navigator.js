import HomeScreen from "./views/HomeScreen";
import LoginScreen from "./views/Login";
import SplashScreen from "./views/Splash";

export default function MyNavigator() {
    if (state.isLoading) {
        return <SplashScreen />;
    }

    return (
        <Stack.Navigator>
            {state.userToken == null ? (
                <Stack.Screen
                    name="SignIn"
                    component={LoginScreen}
                    options={{
                        title: 'Sign in',
                        // When logging out, a pop animation feels intuitive
                        // You can remove this if you want the default 'push' animation
                        animationTypeForReplace: state.isSignout ? 'pop' : 'push',
                    }}
                />
            ) : (
                <Stack.Screen name="Home" component={HomeScreen} />
            )}
        </Stack.Navigator>
    );
}