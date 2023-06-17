import React, { useContext, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import IProjectsListing from '../interfaces/IProjectsListing';
import { Text, View, Image, Modal } from 'react-native-ui-lib';
import { Alert, Pressable } from 'react-native';
import { ScrollView, Switch, TextInput } from 'react-native-gesture-handler';
import { StyleSheet } from 'react-native';
import GradientButton from '../components/GradientButton';
import { UserContext } from 'contexts/UserContext';
import {
  ADD_COMMENT,
  ADD_LIKE,
  DELETE_COMMENT,
  DELETE_LIKE,
  DELETE_PROJECT,
  MODIFY_COMMENT,
  UPDATE_PUBLIC_STATE,
} from '../apollo/mutations';
import { LinearGradient } from 'expo-linear-gradient';
import IFolder from 'interfaces/IFolder';
import { GET_FOLDER_BY_IDPROJECT } from 'apollo/queries';
import { useNavigation } from '@react-navigation/native';
import EditorScreen from 'screens/EditorScreen';

type Props = {
  project: IProjectsListing;
  modalVisible: boolean;
  setModalVisible: (modalVisible: boolean) => void;
};

export default function ProjectDetails({
  project,
  modalVisible,
  setModalVisible,
}: Props) {
  const [modifyPublicState] = useMutation(UPDATE_PUBLIC_STATE);
  const { user, token } = useContext(UserContext);

  const [mainFolder, setMainFolder] = useState<IFolder>();
  const [folders, setFolders] = useState<IFolder[]>();
  const [isLiked, setIsLiked] = useState<boolean>(
    project.likes.filter((el) => el.user.id === user?.id).length > 0
      ? true
      : false,
  );
  const [commentEdition, setCommentEdition] = useState<number | null>(null);
  const [pageSelected, setPageSelected] = useState<number>(1);
  const [userComment, setUserComment] = useState('');
  const [userCommentModify, setUserCommentModify] = useState('');
  const [modalCodeVisible, setModalCodeVisible] = useState<boolean>(false);

  const navigation = useNavigation<any>();
  if (user == null) {
    return navigation.navigate({ name: 'Login' });
  }
  const [addLike] = useMutation(ADD_LIKE, {
    variables: { idProject: Number(project.id) },
    context: {
      headers: {
        authorization: token,
      },
    },
    onCompleted() {
      setIsLiked(true);
      console.log(project.likes.length);
    },
  });

  const [deleteLike] = useMutation(DELETE_LIKE, {
    variables: { idProject: Number(project.id) },
    context: {
      headers: {
        authorization: token,
      },
    },
    onCompleted() {
      setIsLiked(false);
    },
    update: (cache) => {
      cache.modify({
        id: cache.identify({
          __typename: 'Project',
          id: Number(project.id),
        }),
        fields: {
          likes(existingLikes, { readField }) {
            return existingLikes.filter(
              (likeRef: any) => user?.id !== readField('id', likeRef.user),
            );
          },
        },
      });
    },
  });

  const [addCommentary] = useMutation(ADD_COMMENT, {
    context: {
      headers: {
        authorization: token,
      },
    },
    onCompleted() {
      setUserComment('');
    },
  });

  const [modifyComment] = useMutation(MODIFY_COMMENT, {
    context: {
      headers: {
        authorization: token,
      },
    },
    onCompleted() {
      setCommentEdition(null);
    },
  });

  const [deleteComment] = useMutation(DELETE_COMMENT);
  const [deleteProject] = useMutation(DELETE_PROJECT);

  useQuery(GET_FOLDER_BY_IDPROJECT, {
    variables: { idProject: Number(project.id) },
    context: {
      headers: {
        authorization: token,
      },
    },
    onCompleted(data: { getAllFoldersByProjectId: IFolder[] }) {
      setFolders(
        data.getAllFoldersByProjectId
          .filter((el) => el.parentFolder != null)
          .sort((a, b) => a.id - b.id),
      );
      setMainFolder(
        data.getAllFoldersByProjectId.filter(
          (el) => el.parentFolder === null,
        )[0],
      );
    },
  });

  const postComment = () => {
    addCommentary({
      variables: {
        idProject: Number(project.id),
        comment: userComment,
      },
      context: {
        headers: {
          authorization: token,
        },
      },
    });
  };

  const handleComment = (e: string) => {
    setUserComment(e);
  };

  const deleteProjectConfirmation = () => {
    Alert.alert('Wait a second...', 'Are you sure to delete this project ?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      { text: 'OK', onPress: () => handleDeleteProject() },
    ]);
  };

  const deleteCommentConfirmation = (id: number) => {
    Alert.alert('Wait a second...', 'Are you sure to delete this comment ?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      { text: 'OK', onPress: () => handleDeleteComment(id) },
    ]);
  };

  const modifyPrivacy = async () => {
    await modifyPublicState({
      variables: {
        modifyProjectId: Number(project.id),
        isPublic: !project.isPublic,
      },
      context: {
        headers: {
          authorization: token,
        },
      },
      refetchQueries: ['GetSharedProjects'],
      update: (cache) => {
        cache.modify({
          id: cache.identify({
            __typename: 'Project',
            id: Number(project.id),
          }),
          fields: {
            isPublic: () => !project.isPublic,
          },
        });
      },
    });
  };

  const handleConfirmModifyComment = (id: number) => {
    modifyComment({
      variables: {
        idComment: Number(id),
        content: userCommentModify,
      },
    });
  };

  const handleModifyComment = (id: number) => {
    setCommentEdition(id);
    if (
      project.comments &&
      project.comments?.filter((el) => el.id === id).length > 0
    ) {
      setUserCommentModify(
        project.comments?.filter((el) => el.id === id)[0].comment,
      );
    }
  };

  const handleDeleteProject = () => {
    deleteProject({
      variables: {
        deleteProjectId: Number(project.id),
      },
      context: {
        headers: {
          authorization: token,
        },
      },
      onCompleted: () => {
        setModalVisible(false);
      },
      update: (cache) => {
        cache.evict({ id: 'Project:' + project.id });
      },
    });
  };

  const handleDeleteComment = (id: number) => {
    // eslint-disable-next-line no-restricted-globals, no-alert
    deleteComment({
      variables: {
        idComment: Number(id),
      },
      context: {
        headers: {
          authorization: token,
        },
      },
      update: (cache) => {
        cache.modify({
          id: cache.identify({
            __typename: 'Project',
            id: Number(project.id),
          }),
          fields: {
            comments(existingCommentRefs, { readField }) {
              return existingCommentRefs.filter(
                (commentRef: any) => id !== readField('id', commentRef),
              );
            },
          },
        });
      },
    });
  };

  const handleChangeComment = (e: string) => {
    setUserCommentModify(e);
  };

  const handlePageSelected = (position: string) => {
    if (position === 'left') {
      if (pageSelected > 1) {
        setPageSelected(pageSelected - 1);
      }
    }
    if (position === 'right') {
      if (
        project.comments &&
        pageSelected < Math.floor(project.comments.length / 10) + 1
      ) {
        setPageSelected(pageSelected + 1);
      }
    }
  };

  const dateFormat = (date: Date): string => {
    const diff = (Date.now() - date.getTime()) / 1000;
    const unit =
      diff / 60 / 60 / 24 / 30.44 / 12 > 1
        ? 'year'
        : diff / 60 / 60 / 24 / 30.44 > 1
        ? 'month'
        : diff / 60 / 60 / 24 > 1
        ? 'day'
        : diff / 60 / 60 > 1
        ? 'hour'
        : 'minute';
    if (unit === 'minute') {
      return Math.floor(diff / 60) > 1
        ? `${Math.floor(diff / 60)} minutes ago`
        : `1 minute ago`;
    }
    if (unit === 'hour') {
      return Math.floor(diff / 60 / 60) > 1
        ? `${Math.floor(diff / 60 / 60)} hours ago`
        : `1 hour ago`;
    }
    if (unit === 'day') {
      return Math.floor(diff / 60 / 60 / 24) > 1
        ? `${Math.floor(diff / 60 / 60 / 24)} days ago`
        : `yesterday`;
    }
    if (unit === 'month') {
      return Math.floor(diff / 60 / 60 / 24 / 30.44) > 1
        ? `${Math.floor(diff / 60 / 60 / 24 / 30.44)} months ago`
        : `1 month ago`;
    }
    if (unit === 'year') {
      return Math.floor(diff / 60 / 60 / 24 / 30.44 / 24) > 1
        ? `${Math.floor(diff / 60 / 60 / 24 / 30.44 / 24)} years ago`
        : `1 year ago`;
    }
    return date.toString();
  };

  const displayProjectTree = (
    folder: IFolder[],
    padding: number,
    isMainFolder: boolean,
  ) =>
    folder?.map((el, index) => {
      let lineBreak = isMainFolder ? 0 : padding;
      if (index > 0 && el.parentFolder !== folder[index - 1].parentFolder) {
        lineBreak += 1;
        displayProjectTree([el], lineBreak, false);
      }
      return (
        <View key={el.id}>
          <View style={{ flex: 1, flexDirection: 'row' }}>
            {!isMainFolder && (
              <Text style={{ fontWeight: 'bold', paddingLeft: lineBreak * 15 }}>
                ╚&gt;
              </Text>
            )}
            <Text style={{ fontWeight: 'bold', paddingLeft: 20 }}>
              {el.name}
            </Text>
          </View>
          <View>
            {el.files.map((file) => (
              <View style={{ flex: 1, flexDirection: 'row' }} key={file.name}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    paddingLeft: lineBreak * 15 + 30,
                  }}
                >
                  ╚&gt;
                </Text>
                <Text
                  style={{
                    fontWeight: 'bold',
                  }}
                >{`${file.name}.${file.extension}`}</Text>
              </View>
            ))}
          </View>
        </View>
      );
    });

  return (
    <Modal
      transparent={true}
      onBackdropPress={() => setModalVisible(false)}
      onBackButtonPress={() => setModalVisible(false)}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}
    >
      <EditorScreen
        modalVisible={modalCodeVisible}
        setModalVisible={setModalCodeVisible}
      />
      <LinearGradient
        colors={['#1d2448', '#131d2f']}
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 1 }}
        style={styles.mainContainer}
      >
        <ScrollView style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.top}>
              <Pressable
                style={styles.buttonClose}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Image
                  style={styles.logoClose}
                  source={require('../assets/xmark-solid.png')}
                />
              </Pressable>
              <Text style={styles.mainTitle}>Project Details</Text>
            </View>
            <View style={styles.topInformations}>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  width: '100%',
                }}
              >
                <Text style={styles.mediumTextUnderline}>{project.name}</Text>
                {project.user.id === user.id && (
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}
                  >
                    <Text style={{ color: project.isPublic ? 'green' : 'red' }}>
                      {project.isPublic ? 'Public' : 'Private'}
                    </Text>
                    <Switch
                      trackColor={{ false: 'red', true: 'green' }}
                      thumbColor={project.isPublic ? 'lightgrey' : 'lightgrey'}
                      onValueChange={() => modifyPrivacy()}
                      value={project.isPublic}
                    />
                  </View>
                )}
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={styles.littleText}>by </Text>
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: 'bold',
                    color:
                      project.user.id === user?.id
                        ? 'cyan'
                        : project.user.premium
                        ? 'gold'
                        : 'white',
                  }}
                >
                  {project.user.pseudo} {project.user.premium && '👑'}
                  <Text style={styles.littleText}>
                    {project.user.id === user?.id && '(you)'}
                  </Text>
                </Text>
              </View>
              <View style={styles.rowEnd}>
                <Text style={{ marginRight: 10, color: 'white' }}>
                  {project.likes.length}
                </Text>
                <Pressable
                  onPress={() =>
                    !isLiked && user.id != project.user.id
                      ? addLike()
                      : isLiked && user.id != project.user.id && deleteLike()
                  }
                >
                  <Image
                    style={styles.logoHeart}
                    source={
                      isLiked
                        ? require('../assets/heart-solid-red.png')
                        : require('../assets/heart-solid-white.png')
                    }
                  />
                </Pressable>
              </View>
              <Text
                style={[styles.littleText, styles.grey]}
              >{`${project.updatedAt
                .toString()
                .split('T')[0]
                .split('-')
                .reverse()
                .join('/')} at ${
                project.updatedAt.toString().split('T')[1].split('.')[0]
              }`}</Text>
              <Text style={styles.description}>{project.description}</Text>
              <Text style={styles.titleUnderline}>Tree structure :</Text>
            </View>
            <View style={styles.structure}>
              {mainFolder && displayProjectTree([mainFolder], 0, true)}
              {folders && displayProjectTree(folders, 1, false)}
            </View>
            <View style={styles.button}>
              <GradientButton
                gradient="cyanToBlue"
                onPress={() => {
                  setModalCodeVisible(true);
                }}
              >
                ACCESS THE CODE
              </GradientButton>
            </View>
            <View style={styles.commentaries}>
              <Text style={styles.titleUnderline}>Commentaries :</Text>
              {project.comments && project.comments.length > 0 ? (
                <View style={styles.commentariesContainer}>
                  {project.comments &&
                    project.comments
                      .filter(
                        (el, index) =>
                          Math.floor(index / 10) === pageSelected - 1,
                      )
                      .sort(
                        (a, b) =>
                          new Date(b.createdAt).getTime() -
                          new Date(a.createdAt).getTime(),
                      )
                      .map((el, index) => (
                        <View
                          key={el.id}
                          style={{
                            flex: 1,
                            flexDirection: 'column',
                            width: '100%',
                            borderBottomColor: 'white',
                            borderBottomWidth:
                              index === project.comments.length - 1 ? 0 : 2,
                            padding: 10,
                          }}
                        >
                          <View
                            style={{
                              flex: 1,
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                              width: '100%',
                              marginBottom: 10,
                            }}
                          >
                            <View
                              style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                maxWidth: '80%',
                              }}
                            >
                              <Text
                                style={
                                  (styles.textStyle,
                                  {
                                    marginRight: 8,
                                    fontWeight: 'bold',
                                    color:
                                      el.user.id === user?.id
                                        ? 'cyan'
                                        : el.user.premium
                                        ? 'gold'
                                        : 'white',
                                  })
                                }
                              >
                                {el.user.pseudo}
                              </Text>
                              <Text style={{ marginRight: 3 }}>-</Text>
                              <Text style={{ marginRight: 3 }}>
                                {dateFormat(new Date(el.createdAt))}
                              </Text>
                              {new Date(el.createdAt).getTime() !==
                                new Date(el.updatedAt).getTime() && (
                                <Text
                                  style={{ color: '#cfd1d0', fontSize: 12 }}
                                >
                                  (modified)
                                </Text>
                              )}
                            </View>
                            {el.user.id === user?.id && (
                              <View
                                style={{
                                  flexDirection: 'row',
                                  justifyContent: 'space-between',
                                  alignItems: 'center',
                                }}
                                key={el.id}
                              >
                                {commentEdition && commentEdition === el.id ? (
                                  <Pressable
                                    onPress={() => {
                                      handleConfirmModifyComment(el.id);
                                    }}
                                  >
                                    <Image
                                      source={require('../assets/check-solid.png')}
                                      style={styles.logoValid}
                                    />
                                  </Pressable>
                                ) : (
                                  <Pressable
                                    onPress={() => {
                                      handleModifyComment(el.id);
                                    }}
                                  >
                                    <Image
                                      source={require('../assets/pen-solid.png')}
                                      style={styles.logoEdit}
                                    />
                                  </Pressable>
                                )}
                                <Pressable
                                  onPress={() => {
                                    deleteCommentConfirmation(el.id);
                                  }}
                                >
                                  <Image
                                    source={require('../assets/xmark-solid.png')}
                                    style={styles.logoCross}
                                  />
                                </Pressable>
                              </View>
                            )}
                          </View>
                          {commentEdition && commentEdition === el.id ? (
                            <TextInput
                              onChangeText={(text) => handleChangeComment(text)}
                              style={styles.modifyCommentary}
                            >
                              {userCommentModify}
                            </TextInput>
                          ) : (
                            <Text className="p-4 min-h-16 h-fit">
                              {el.comment}
                            </Text>
                          )}
                        </View>
                      ))}
                </View>
              ) : (
                <Text style={styles.noCommentary}>Not commented yet...</Text>
              )}
            </View>
            {project.comments && project.comments.length > 0 && (
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'row',
                  marginVertical: 2,
                  marginBottom: 10,
                }}
              >
                <Pressable
                  onPress={() => {
                    handlePageSelected('left');
                  }}
                >
                  <Text style={{ color: 'white', marginRight: 20 }}>&lt;</Text>
                </Pressable>
                {project.comments &&
                  project.comments.map(
                    (el, index) =>
                      (index === 0 || index % 10 === 0) && (
                        <Pressable
                          key={el.id}
                          onPress={() => {
                            setPageSelected(Math.floor(index / 10) + 1);
                          }}
                        >
                          <Text style={{ color: 'white', marginRight: 20 }}>
                            {Math.floor(index / 10) + 1}
                          </Text>
                        </Pressable>
                      ),
                  )}
                <Pressable
                  onPress={() => {
                    handlePageSelected('right');
                  }}
                >
                  <Text style={{ color: 'white' }}>&gt;</Text>
                </Pressable>
              </View>
            )}

            <TextInput
              placeholder="Add a commentary..."
              onChangeText={(text) => {
                handleComment(text);
              }}
              style={{
                flex: 1,
                flexDirection: 'column',
                width: '95%',
                borderColor: 'white',
                borderWidth: 2,
                marginTop: 10,
                marginBottom: 10,
                padding: 10,
                backgroundColor: 'grey',
              }}
            >
              {userComment}
            </TextInput>
            <View style={{ marginTop: 10 }}>
              <GradientButton
                onPress={() => {
                  postComment();
                }}
                gradient={userComment == '' ? 'disable' : 'cyanToBlue'}
              >
                SEND COMMENTARY
              </GradientButton>
            </View>

            {project.user.id === user?.id && (
              <View style={{ marginTop: 50 }}>
                <GradientButton
                  onPress={() => {
                    deleteProjectConfirmation();
                  }}
                  gradient="redToYellow"
                >
                  DELETE THE PROJECT
                </GradientButton>
              </View>
            )}
          </View>
        </ScrollView>
      </LinearGradient>
    </Modal>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: 'center',
  },
  centeredView: {
    flex: 1,
    marginTop: 10,
    width: '100%',
    height: '100%',
  },
  modalView: {
    margin: 5,
    flex: 1,
    borderRadius: 5,
    padding: 15,
    paddingLeft: 20,
    paddingRight: 20,
    alignItems: 'center',
    elevation: 5,
  },
  top: {
    width: '100%',
    flex: 1,
    flexDirection: 'row',
  },
  buttonClose: {
    color: 'white',
    width: 20,
    marginTop: 5,
  },
  mainTitle: {
    color: 'white',
    textAlign: 'center',
    fontSize: 36,
    maxWidth: 200,
    marginLeft: '25%',
  },
  topInformations: {
    width: '100%',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginTop: 10,
    padding: 10,
  },
  mediumTextUnderline: {
    fontSize: 22,
    color: 'white',
    textDecorationLine: 'underline',
  },
  littleText: {
    fontSize: 16,
    color: 'white',
  },
  description: {
    fontSize: 16,
    color: 'white',
    paddingBottom: 10,
    paddingTop: 10,
  },
  rowEnd: {
    flex: 1,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'flex-end',
  },
  grey: {
    color: 'grey',
  },
  titleUnderline: {
    marginTop: 30,
    fontSize: 20,
    color: 'white',
    textDecorationLine: 'underline',
  },
  structure: {
    backgroundColor: 'grey',
    width: '95%',
    padding: 10,
    borderColor: 'white',
    borderWidth: 2,
  },
  noCommentary: {
    color: 'white',
    width: '100%',
    textAlign: 'center',
    padding: 15,
  },
  button: {
    marginTop: 20,
  },
  modifyCommentary: {
    backgroundColor: 'grey',
    color: 'white',
  },

  commentaries: {
    width: '100%',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    padding: 10,
  },
  commentariesContainer: {
    width: '100%',
    flex: 1,
    flexDirection: 'column',
    marginTop: 10,
    borderWidth: 2,
    borderColor: 'white',
    backgroundColor: 'grey',
  },

  logoHeart: {
    width: 20,
    height: 20,
  },
  logoEdit: {
    width: 15,
    height: 15,
  },
  logoValid: {
    width: 20,
    height: 20,
  },
  logoCross: {
    width: 15,
    height: 15,
    marginLeft: 10,
  },
  logoClose: {
    width: 15,
    height: 15,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },

  img: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  content: {
    borderRadius: 20,
    backgroundColor: '#111c2a',
    width: 365,
  },
  text: {
    marginTop: 8,
    marginLeft: 10,
    color: 'lightgrey',
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 5,
    marginBottom: 5,
  },
  rowButton: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 15,
    marginBottom: 15,
  },
  language: {
    fontWeight: 'bold',
    backgroundColor: 'yellow',
    width: 100,
    textAlign: 'center',
    paddingVertical: 10,
  },
  access: {
    fontWeight: 'bold',
    backgroundColor: 'lightblue',
    width: 180,
    textAlign: 'center',
    borderRadius: 10,
  },
});
