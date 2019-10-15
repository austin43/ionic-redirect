import React, { useMemo } from 'react';
import { IonApp } from '@ionic/react';
import { AppAuth0Provider, useAuth0 } from './AppAuth0Provider';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

const onRedirectCallback = (appState: any) => {
	window.history.replaceState(
		{},
		document.title,
		appState && appState.targetUrl ? appState.targetUrl : window.location.pathname
	)
}

const AppComponent: React.FC = () => {
  const { loading, isAuthenticated, loginWithRedirect, user }: any = useAuth0()

  useMemo(() => {
		if (!loading && isAuthenticated) {
      console.log('is authenticated')
		} else if (!loading && !isAuthenticated) {
			loginWithRedirect({
				appState: { targetUrl: window.location.pathname }
			})
		}
  }, [loading])

  return (
    <IonApp>
      <div>Hello!</div>
    </IonApp>
  )
};

const App: React.FC = () => {
  return (
		<AppAuth0Provider
			domain='ionic-redirect-austin43.auth0.com'
			client_id='3tzxQwTDvTyD1Bn6Oi0biDV335NDciH6'
			redirect_uri={window.location.origin}
			audience='https://ionic-redirect-austin43.auth0.com/api/v2/'
			onRedirectCallback={onRedirectCallback}>
			<AppComponent />
		</AppAuth0Provider>
  )
}

export default App;
