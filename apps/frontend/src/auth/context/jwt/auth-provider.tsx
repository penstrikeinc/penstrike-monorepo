'use client';

import { useEffect, useReducer, useCallback, useMemo } from 'react';
// utils
import axios, { endpoints } from 'src/utils/axios';
//
import { useCreateUserMutation, useLoginMutation, useLogoutMutation } from 'src/services';
import { IUser, JwtReturnType } from 'src/types';
import { NEXT_PUBLIC_API_URL } from 'src/config-global';
import { AuthContext } from './auth-context';
import { isValidToken, setSession } from './utils';
import { ActionMapType, AuthStateType, AuthUserType, RegisterParamsType } from '../../types';

// ----------------------------------------------------------------------

// NOTE:
// We only build demo at basic level.
// Customer will need to do some extra handling yourself if you want to extend the logic and other features...

// ----------------------------------------------------------------------

enum Types {
  INITIAL = 'INITIAL',
  LOGIN = 'LOGIN',
  REGISTER = 'REGISTER',
  LOGOUT = 'LOGOUT',
}

type Payload = {
  [Types.INITIAL]: {
    user: AuthUserType;
  };
  [Types.LOGIN]: {
    user: AuthUserType;
  };
  [Types.REGISTER]: {
    user: AuthUserType;
  };
  [Types.LOGOUT]: undefined;
};

type ActionsType = ActionMapType<Payload>[keyof ActionMapType<Payload>];

// ----------------------------------------------------------------------

const initialState: AuthStateType = {
  user: null,
  loading: true,
};

const reducer = (state: AuthStateType, action: ActionsType) => {
  if (action.type === Types.INITIAL) {
    return {
      loading: false,
      user: action.payload.user,
    };
  }
  if (action.type === Types.LOGIN) {
    return {
      ...state,
      user: action.payload.user,
    };
  }
  if (action.type === Types.REGISTER) {
    return {
      ...state,
      user: action.payload.user,
    };
  }
  if (action.type === Types.LOGOUT) {
    return {
      ...state,
      user: null,
    };
  }
  return state;
};

// ----------------------------------------------------------------------

const STORAGE_KEY = 'accessToken';

type Props = {
  children: React.ReactNode;
};

export function AuthProvider({ children }: Props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { mutateAsync: loginReq } = useLoginMutation();
  const { mutateAsync: createUser } = useCreateUserMutation();
  const { mutateAsync: LogoutUser } = useLogoutMutation();

  const initialize = useCallback(async () => {
    try {
      const accessToken = sessionStorage.getItem(STORAGE_KEY);

      if (accessToken && isValidToken(accessToken)) {
        setSession(accessToken);

        const response = await axios.get<IUser>(endpoints.auth.profile);

        // TODO check response
        const user = response.data;
        console.log({ response, user });
        dispatch({
          type: Types.INITIAL,
          payload: {
            user,
          },
        });
      } else {
        dispatch({
          type: Types.INITIAL,
          payload: {
            user: null,
          },
        });
      }
    } catch (error) {
      console.error(error);
      dispatch({
        type: Types.INITIAL,
        payload: {
          user: null,
        },
      });
    }
  }, []);

  useEffect(() => {
    initialize();
  }, [initialize]);

  // LOGIN
  const login = useCallback(async (email: string, password: string) => {
    const payload = {
      email,
      password,
    };

    const response = await fetch(`${NEXT_PUBLIC_API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const data: JwtReturnType = await response.json();

    if (data) {
      setSession(data.access_token);
      dispatch({
        type: Types.LOGIN,
        payload: {
          user: data.user,
        },
      });
    }

    // loginReq(payload, {
    //   onSuccess: (response) => {
    //     console.log({ response });
    //     // todo fix type issue
    //     // const { access_token, user } = response.data;
    //     // console.log({ response, access_token, user });
    //     // setSession(accessToken);
    //     // dispatch({
    //     //   type: Types.LOGIN,
    //     //   payload: {
    //     //     user,
    //     //   },
    //     // });
    //   },
    // }).then((data) => {
    //   console.log(data);
    // });
  }, []);

  // REGISTER
  const register = useCallback(
    async (params: RegisterParamsType) => {
      const { payload, onSuccess } = params;

      // todo fix type issue.......
      createUser(payload, {
        onSuccess: (response) => {
          const { accessToken, user } = response.data;
          setSession(accessToken);
          dispatch({
            type: Types.REGISTER,
            payload: {
              user,
            },
          });
          onSuccess();
        },
      });
    },
    [createUser]
  );

  // LOGOUT
  const logout = useCallback(async () => {
    LogoutUser();
    setSession(null);
    dispatch({
      type: Types.LOGOUT,
    });
  }, [LogoutUser]);

  // ----------------------------------------------------------------------

  const checkAuthenticated = state.user ? 'authenticated' : 'unauthenticated';

  const status = state.loading ? 'loading' : checkAuthenticated;

  const memoizedValue = useMemo(
    () => ({
      user: state.user,
      method: 'jwt',
      loading: status === 'loading',
      authenticated: status === 'authenticated',
      unauthenticated: status === 'unauthenticated',
      //
      login,
      register,
      logout,
    }),
    [login, logout, register, state.user, status]
  );

  return <AuthContext.Provider value={memoizedValue}>{children}</AuthContext.Provider>;
}
