import * as React from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableHighlight, Image, Dimensions, TextInput } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/Ionicons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { LinearGradient } from 'expo-linear-gradient';

const screen = Dimensions.get('screen');

const communities = [
  {
    id: 1,
    name: 'r/anime',
    subIcon: require('./assets/anime.png'),
    color: '#f68e5d',
    description: 'Reddit\'s premier anime community'
  },
  {
    id: 2,
    name: 'r/gaming',
    subIcon: require('./assets/gaming.png'),
    color: '#c44a56',
    description: 'A subreddit for (almost) anything related to games - video games, board games, card games, etc. (but not sports).'
  },
  {
    id: 3, 
    name: 'r/memes',
    subIcon: require('./assets/memes.jpg'),
    color: '#1a9cf1',
    description: 'Memes! A way of describing cultural information being shared. An element of a culture or system of behavior that may be considered to be passed from one individual to another by nongenetic means, especially imitation.'
  },
  {
    id: 4,
    name: 'r/brandnewsentence',
    subIcon: require('./assets/brandnewsentence.png'),
    color: '#110294',
    description: 'For sentences never before written, found in the wild.'
  },
  {
    id: 5,
    name: 'r/Hololive',
    subIcon: require('./assets/hololive.png'),
    color: '#5eddec',
    description: 'The official hololive production subreddit! What is hololive production? We\'re a team of content creators using digital avatars providing outstanding entertainment to the masses! We specialize in songs and music, but more often than not, will just stream games or chat with our fans! Posts not made by the official administrators are not characteristically representative of hololive production, nor any of the talents.'
  }
];

const posts = [
  {
    id: 1,
    title: 'Bocchi and Kita do be looking different...',
    content: null,
    author: 'u/Glovejuggler',
    postedOn: 'r/Hololive',
    subIcon: require('./assets/hololive.png'),
    upvoteCount: 2758,
    comments: 28,
    time: '2h',
    picture: require('./assets/post/bocchi.webp')
  },
  {
    id: 2,
    title: 'Feral wilderness prophets',
    content: null,
    author: 'u/yujin',
    postedOn: 'r/brandnewsentence',
    subIcon: require('./assets/brandnewsentence.png'),
    upvoteCount: 9451,
    comments: 1845,
    time: '3d',
    picture: require('./assets/post/lagomorphs.webp')
  },
  {
    id: 3,
    title: 'among us',
    content: null,
    author: 'u/The_Originals_1',
    postedOn: 'r/memes',
    subIcon: require('./assets/memes.jpg'),
    upvoteCount: 8269,
    comments: 524,
    time: '11h',
    picture: require('./assets/post/amongus.webp'),
  },
  {
    id: 4,
    title: 'Least insane hoshiyomi',
    content: null,
    author: 'u/Glovejuggler',
    postedOn: 'r/Hololive',
    subIcon: require('./assets/hololive.png'),
    upvoteCount: 4987,
    comments: 185,
    time: '8d',
    picture: require('./assets/post/hoshiyomi.png')
  },
  {
    id: 5,
    title: 'Skyrim',
    content: null,
    author: 'u/Gamerfl0w',
    postedOn: 'r/gaming',
    subIcon: require('./assets/gaming.png'),
    upvoteCount: 8269,
    comments: 524,
    time: '22h',
    picture: require('./assets/post/skyrim.webp'),
  },
  {
    id: 6,
    title: 'Nakiri Ayame',
    content: 'Por favor, Dios, tengo tantas ganas de inseminar a Ayame Quiero que ella dé a luz a nuestros hijos con esas hermosas caderas perfectas para procrear. Es un hermoso y radiante ángel de otro mundo. Como una diosa habiendo bajado a la tierra para limpiarnos de nuestros pecados. Ayame está más allá de lo divino. No puedo evitar arrodillarme en adoración cada vez que veo su hermoso rostro y las prendas que usa. La anhelo de una manera tanto primaria como espiritual. Cometería más crímenes de guerra que todos los presidentes de la historia solo para lamer el sudoroso dulce y reluciente de su piel suave y cremosa. Quiero escuchar sus gemidos mientras mi virilidad palpita dentro de ella. Quiero escuchar su corazón acelerarse mientras nuestros cuerpos se vuelven uno y nuestras almas se entrelazan irreversiblemente en el santo pecado de la unión carnal. Quiero succionar de su seno mientras acaricia suavemente mi ereccion furiosa. Sus gritos de placer y el balanceo de nuestra cama serían más fuertes que cacofonía de diez mil zumbidos. Le haría el amor hasta que mi cuerpo se rindiera. Dejaría que me rompiera la caja toraxica con cualquier parte de su cuerpo. Ella es tan perfecta que duele. Cada momento sin ella sufro un dolor peor que romper todos los hueso de mi cuerpo simultáneamente mientras me ahogo. La quiero, la necesito. Quiero profanar su atuendo revelador. Quiero formar una familia con ella y retirame después de nuestros veinticinco hijos hayan crecido y se hayan mudado. Quiero ver esos deliciosos labios decir palabras tan sucias y perversas en mi oído. Quiero follarla como si me debiera dinero y me estuviera pagando con su cuerpo. La dejaría pisarme solo para sentir el calor suave y firme de sus pies sobre mi rostro y en mi ingle. Dormiría debajo de ella solo para atrapar su baba en mi boca. Le sacaría los pelos de la cabeza solo para oler su aroma y fragancia. De verdad que es mi razón para vivir y no pienso dejar ese pensamiento por Ayame.',
    author: 'u/nakirium_addict',
    postedOn: 'r/Hololive',
    subIcon: require('./assets/hololive.png'),
    upvoteCount: -48,
    comments: 26,
    time: '6h',
    picture: null
  },
  {
    id: 7,
    title: 'Crunchyroll FINALLY adds separate audio streams to single episodes.',
    content: 'Easily the most embarrassing part of the Crunchyroll experience has been them grouping each dub language as their own "season". Seeing the 2 cour, 2 OVA series The Ancient Magus\' Bride have 32 seasons listed in the menu was just sad.',
    author: 'u/KlooKloo',
    postedOn: 'r/anime',
    subIcon: require('./assets/anime.png'),
    upvoteCount: 3274,
    comments: 243,
    time: '10h',
    picture: null,
  },
];

const discover = [
  {
    id: 1,
    text: 'r/AITA',
    color: '#389e97'
  },
  {
    id: 2,
    text: 'r/IAmTheMainCharacter',
    color: '#2c3eb1'
  },
  {
    id: 3,
    text: 'r/Genshin_Impact',
    color: '#eebb46'
  },
  {
    id: 4,
    text: 'r/Cytus',
    color: '#ce0102'
  },
  {
    id: 5,
    text: 'r/ContagiousLaughter',
    color: '#312744'
  },
  {
    id: 6,
    text: 'r/WCGW',
    color: '#91ac3d'
  },
  {
    id: 7,
    text: 'r/Philippines',
    color: '#f38971'
  },
  {
    id: 8,
    text: 'r/cats',
    color: '#17212e'
  }
]

function Home() {
  return (
      <SafeAreaProvider>
        <ScrollView style={styles.container}>
          <View>
            {
              posts.map((x) => {
                  return (
                  <View style={styles.postContainer} key={x.id}>
                    <View style={styles.postHeader}>
                      <View style={{ backgroundColor:'white', width: 35, height: 35, borderRadius: 9999, overflow: 'hidden' }}>
                        <Image source={x.subIcon} style={{width: 35, height: 35}}/>
                      </View>
                      <View style={{ marginLeft: 10 }}>
                        <Text style={{ color: 'white' }}>{x.postedOn}</Text>
                        <Text style={{ color: '#aaa', fontSize: 11 }}>{x.author} • {x.time}</Text>
                      </View>
                    </View>
                    <View style={styles.postContent}>
                      <Text style={{ color: 'white', fontSize: 20 }}>{x.title}</Text>
                      <Text numberOfLines={3} style={{ color: '#aaa', fontSize: 12, paddingVertical: 8, display: x.content === null ? 'none' : 'flex' }}>{x.content}</Text>
                    </View>
                    <View style={{ alignItems: 'center' }}>
                    <Image source={x.picture} style={{width: screen.width, height: undefined, aspectRatio: 1, resizeMode: 'contain', display: x.picture === null ? 'none' : 'flex'}}/>
                    </View>
                    <View style={styles.postActions}>
                      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <TouchableHighlight>
                          <Ionicons name='chevron-up-circle-outline' color={'#777'} size={20}/>
                        </TouchableHighlight>
                        <Text style={{ color: '#777', width: 50, textAlign: 'center' }}>{x.upvoteCount}</Text>
                        <TouchableHighlight>
                          <Ionicons name='chevron-down-circle-outline' color={'#777'} size={20}/>
                        </TouchableHighlight>
                      </View>
                      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <TouchableHighlight>
                        <Ionicons name='chatbox-outline' color={'#777'} size={20}/>
                      </TouchableHighlight>
                      <Text style={{ color:'#777', width: 50, textAlign: 'center' }}>{x.comments}</Text>
                      </View>
                      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <TouchableHighlight>
                        <Ionicons name='share-social-outline' color={'#777'} size={20}/>
                      </TouchableHighlight>
                      <Text style={{ color:'#777', width: 50, textAlign: 'center' }}>Share</Text>
                      </View>
                      <View  style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <TouchableHighlight>
                          <Ionicons name='trophy-outline' color={'#777'} size={20}/>
                        </TouchableHighlight>
                        <Text style={{ color:'#777', width: 50, textAlign: 'center' }}>Award</Text>
                      </View>
                    </View>
                  </View>
                )
              })
            }
          </View>
        </ScrollView>
      </SafeAreaProvider>
  )
}

function Default() {
  return (
      <MyTabs/>
  )
}

function Discover() {
  return (
    <SafeAreaProvider>
      <ScrollView style={{ flex: 1, backgroundColor: '#030303' }}>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 5, paddingVertical: 10 }}>
        {
          discover.map((x) => {
            return (
              <View key={x.id} style={{ width: '50%' }}>
                <LinearGradient colors={['rgba(0,0,0,0.7)', 'transparent']} style={{ backgroundColor: x.color, borderRadius: 10, padding: 10, margin: 5, height: 250 }}>
                  <Text style={{ color: 'white', fontWeight: 'bold' }}>{x.text}</Text>
                </LinearGradient>
              </View>
            )
          })
        }
        </View>
      </ScrollView>
    </SafeAreaProvider>
  )
}

function Chat() {
  return (
    <SafeAreaProvider>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#030303' }}>
        <View style={{ alignItems: 'center' }}>
          <Ionicons name="logo-reddit" color={'#aaa'} size={150}/>
          <Text style={{ color: '#aaa', fontWeight: 'bold' }}>Your chats will show up here.</Text>
          <Text style={{ color: '#aaa', marginTop: 15 }}>Get started by tapping the new chat button</Text>
          <TouchableHighlight style={{ justifyContent: 'center', paddingHorizontal: 25, paddingVertical: 5, borderRadius: 150, backgroundColor: '#358fea', marginTop: 20 }}>
            <Text style={{ color: 'white', fontWeight: 'bold' }}>New Chat</Text>
          </TouchableHighlight>
        </View>
      </View>
    </SafeAreaProvider>
  )
}

function Inbox() {
  return (
    <SafeAreaProvider>
      <View style={{ flex: 1, backgroundColor: '#030303', justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: '#aaa' }}>Nothing to show here.</Text>
      </View>
    </SafeAreaProvider>
  )
}

function Create({navigation}) {
  return (
    <SafeAreaView style={{ backgroundColor: '#111111', flex:1 }}>
      <View style={{ paddingHorizontal: 5 }}>
        <TouchableHighlight style={{ borderRadius: 9999, height: 40, width: 40, alignItems: 'center', justifyContent: 'center' }} underlayColor={'#ffffff33'} onPress={() => {
          navigation.goBack();
        }}>
          <Ionicons name="close-outline" color={'#aaa'} size={40}/>
        </TouchableHighlight>
      </View>
      <View style={{ paddingHorizontal: 10, marginTop: 20 }}>
        <TextInput placeholder="Title" placeholderTextColor={'#aaa'} cursorColor={'#aaa'} style={{ fontSize: 25, color: 'white' }}/>
        <TextInput placeholder="body text (optional)" placeholderTextColor={'#aaa'} cursorColor={'#aaa'} multiline={true} style={{color: 'white' }}/>
      </View>
    </SafeAreaView>
  )
}

function Sub({route}) {
  const {id, name, color, icon, description} = route.params;
  return (
    <SafeAreaProvider style={styles.container}>
      <ScrollView>
        <View style={{ backgroundColor: color, height: 78, justifyContent: 'flex-end', marginBottom: 35 }}>
          <Image source={icon} style={{width: 60, height: 60, backgroundColor: 'white', borderRadius: 9999, borderColor: '#030303', borderWidth: 2, transform: [{translateY: 30}, {translateX: 20}]}}/>
        </View>
        <View style={{ paddingHorizontal: 15, justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20 }}>{name}</Text>
          <TouchableHighlight style={{ backgroundColor: color, alignItems: 'center', justifyContent: 'center', borderRadius: 250, paddingHorizontal: 20, paddingVertical: 3 }}>
            <Text style={{ color: 'white', fontWeight: 'bold' }}>Join</Text>
          </TouchableHighlight>
        </View>
        <View>
          <Text numberOfLines={2} style={{ color: '#aaa', paddingHorizontal: 10, paddingVertical:10 }}>{description}</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10, paddingVertical: 10 }}>
          <Ionicons name='flame-outline' color={'#aaa'} size={18} style={{ width: 25 }}/>
          <Text style={{ color: '#aaa' }}>Hot posts</Text>
        </View>
        {
          posts.filter((x) => {
            return x.postedOn === name;
          }).map((x) => {
            return (
              <View style={styles.postContainer} key={x.id}>
                    <View style={styles.postHeader}>
                        <Text style={{ color: '#aaa', fontSize: 11 }}>{x.author} • {x.time}</Text>
                    </View>
                    <View style={styles.postContent}>
                      <Text style={{ color: 'white', fontSize: 20 }}>{x.title}</Text>
                      <Text numberOfLines={3} style={{ color: '#aaa', fontSize: 12, paddingVertical: 8, display: x.content === null ? 'none' : 'flex' }}>{x.content}</Text>
                    </View>
                    <View style={{ alignItems: 'center' }}>
                    <Image source={x.picture} style={{width: screen.width, height: undefined, aspectRatio: 1, resizeMode: 'contain', display: x.picture === null ? 'none' : 'flex'}}/>
                    </View>
                    <View style={styles.postActions}>
                      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <TouchableHighlight>
                          <Ionicons name='chevron-up-circle-outline' color={'#777'} size={20}/>
                        </TouchableHighlight>
                        <Text style={{ color: '#777', width: 50, textAlign: 'center' }}>{x.upvoteCount}</Text>
                        <TouchableHighlight>
                          <Ionicons name='chevron-down-circle-outline' color={'#777'} size={20}/>
                        </TouchableHighlight>
                      </View>
                      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <TouchableHighlight>
                        <Ionicons name='chatbox-outline' color={'#777'} size={20}/>
                      </TouchableHighlight>
                      <Text style={{ color:'#777', width: 50, textAlign: 'center' }}>{x.comments}</Text>
                      </View>
                      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <TouchableHighlight>
                        <Ionicons name='share-social-outline' color={'#777'} size={20}/>
                      </TouchableHighlight>
                      <Text style={{ color:'#777', width: 50, textAlign: 'center' }}>Share</Text>
                      </View>
                      <View  style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <TouchableHighlight>
                          <Ionicons name='trophy-outline' color={'#777'} size={20}/>
                        </TouchableHighlight>
                        <Text style={{ color:'#777', width: 50, textAlign: 'center' }}>Award</Text>
                      </View>
                    </View>
                  </View>
            )
          })
        }
      </ScrollView>
    </SafeAreaProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#030303',
    flex: 1,
  },
  chat: {
    justifyContent: 'flex-start',
    bottom: 0,
    height: 70,
    width: '100%',
    backgroundColor: '#35383e',
    color: 'white',
    paddingHorizontal: 10,
    paddingVertical: 12,
    flexDirection: 'row',
  },
  icon: {
    width: 45,
    height: 45,
    backgroundColor: '#282a30',
    borderRadius: 9999,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8
  },
  inputContainer: {
    backgroundColor: 'white',
    width: 298,
    alignItems: 'baseline',
    justifyContent: 'center',
    backgroundColor: '#282a30',
    borderRadius: 9999,
    paddingHorizontal: 15,
  },
  input: {
    height: 45,
    borderRadius: 9999,
    color: 'white',
    width: '100%',
    paddingVertical: 8
  },
  postContainer: {
    paddingVertical: 5,
    backgroundColor: '#111111',
    marginBottom: 5
  },
  postHeader: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    flexDirection: 'row',
    alignItems: 'center'
  },
  postContent: {
    paddingHorizontal: 10,
    paddingTop: 3,
  },
  postActions: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  }
});

const Drawer = createDrawerNavigator();

function CustomDrawerContent({navigation, props}) {
  return (
    <DrawerContentScrollView {...props}>
      <View style={{ paddingHorizontal: 20, paddingVertical: 10 }}>
        <Text style={{ color: '#aaa' }}>Your communities</Text>
      </View>
      {
        communities.map((x) => {
          return (
              <DrawerItem key={x.id} activeBackgroundColor='#ddd' onPress={() => {
                navigation.navigate('Sub', {id: x.id, name: x.name, color: x.color, icon: x.subIcon, description: x.description});
              }} labelStyle={{ color: '#aaa' }} icon={() => {
                return (
                  <Image style={{ width: 35, height: 35, borderRadius: 9999, backgroundColor: 'white' }} source={x.subIcon}/>
                )
              }} label={x.name}/>
          )
        })
      }
    </DrawerContentScrollView>
  );
}

function Main() {
  return (
    <Drawer.Navigator useLegacyImplementation screenOptions={({route}) => ({ 
      drawerStyle: {
        backgroundColor: '#111111',
        width: '80%'
      },
      swipeEdgeWidth: route.name === 'Sub' ? 0 : 9999,
      headerShown: false,
     })} drawerContent={(props) => <CustomDrawerContent {...props}/>}>
      <Drawer.Screen options={{ 
        drawerItemStyle: {
          display: 'none'
        }
       }} name="Default" component={Default}/>
    </Drawer.Navigator>
  );
}

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator id='tab' screenOptions={({ route, navigation }) => ({ 
      tabBarStyle: {
        backgroundColor: '#111111',
        display: route.name === 'Create' ? 'none' : 'flex'
      },
      tabBarActiveTintColor: 'white',
      tabBarIcon: ({focused, color}) => {
        let iconName;

        if (route.name === 'Home') {
          iconName = focused ? 'home' : 'home-outline';
          color = focused ? 'white' : '#777'
        } else if (route.name === 'Discover') {
          iconName = focused ? 'compass' : 'compass-outline';
          color = focused ? 'white' : '#777'
        } else if (route.name === 'Chat') {
          iconName = focused ? 'chatbubble-ellipses' : 'chatbubble-ellipses-outline';
          color = focused ? 'white' : '#777'
        } else if (route.name === 'Inbox') {
          iconName = focused ? 'notifications' : 'notifications-outline';
          color = focused ? 'white' : '#777'
        } else if (route.name === 'Create') {
          iconName = focused ? 'add' : 'add-outline';
          color = focused ? 'white' : '#777'
        }

        return <Ionicons name={iconName} color={color} size={24}/>
      },
      headerStyle: {
        backgroundColor: route.params?.color ?? '#111111',
      },
      headerTitleStyle: {
        color: 'white'
      },
      headerTitle: route.params?.name ?? route.name,
      headerShown: route.name === 'Create' ? false : true,
      headerLeft: () => {
        return route.name !== 'Sub' ?
        <TouchableHighlight style={{ marginLeft: 13, borderRadius: 9999, width: 40, height: 40, alignItems: 'center', justifyContent: 'center' }} underlayColor={'#ffffff33'} onPress={() => {
          navigation.openDrawer();
        }}>
          <Ionicons name='menu' size={28} color={'white'}/>
        </TouchableHighlight> :
        <TouchableHighlight style={{ marginLeft: 13, borderRadius: 9999, width: 40, height: 40, alignItems: 'center', justifyContent: 'center' }} underlayColor={'#ffffff33'} onPress={() => {
          navigation.goBack();
        }}>
          <Ionicons name='arrow-back' size={28} color={'white'}/>
        </TouchableHighlight>
      }
     })}>
      <Tab.Screen name="Home" component={Home}/>
      <Tab.Screen name="Discover" component={Discover} />
      <Tab.Screen name="Create" component={Create}/>
      <Tab.Screen name="Chat" component={Chat} />
      <Tab.Screen name="Inbox" component={Inbox} />
      <Tab.Screen options={{ 
        tabBarItemStyle:{ 
          display: 'none'
         }
       }} name="Sub" component={Sub}/>
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Main/>
      <StatusBar style="light" />
    </NavigationContainer>
  );
}