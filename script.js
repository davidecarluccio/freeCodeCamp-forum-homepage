styled = styled.default;

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [],
      topics: [] };

  }

  componentDidMount() {

    fetch('https://forum-proxy.freecodecamp.rocks/latest').
    then(response => response.json()).
    then(data => {
      this.setState({
        users: data.users,
        topics: data.topic_list.topics });

    });
  }

  getUserFromID(id) {
    return this.state.users.find(user => user.id === id);
  }

  render() {
    return /*#__PURE__*/(
      React.createElement("div", { className: "topics-list" }, /*#__PURE__*/
      React.createElement("div", { class: "header" }, /*#__PURE__*/
      React.createElement("div", { class: "header__field header__rank" }, "#"), /*#__PURE__*/
      React.createElement("div", { class: "header__field header__topic" }, "Topic"), /*#__PURE__*/
      React.createElement("div", { id: "replace header-replies", class: "header__field header__replies" }, "Repls."), /*#__PURE__*/
      React.createElement("div", { class: "header__field header__views" }, "Views"), /*#__PURE__*/
      React.createElement("div", { class: "header__field header__activity" }, "Act.")),


      this.state.topics.map((topic, index) => {
        return /*#__PURE__*/React.createElement(ForumTopic, { index: index + 1, topic: topic, getUserFromID: this.getUserFromID.bind(this) });
      })));



  }}


moment.locale('en', {
  relativeTime: {
    future: 'in %s',
    past: '%s ago',
    s: '%ds',
    ss: '%ds',
    m: '%dm',
    mm: '%dm',
    h: '%dh',
    hh: '%dh',
    d: '%d',
    dd: '%dd',
    M: '%dM',
    MM: '%dM',
    y: '%dy',
    yy: '%dY' } });



const StyledForumTopic = styled.div`
  background-color: white;
  border: 2px solid #EAEAEA;
  border-radius: 0.75em;
  overflow: hidden;
  box-shadow: 0 1px 1px 0 rgba(240, 240, 240, 0.05);
  margin-bottom: 0.6em;

  &:nth-child(even) {
    background-color: #f9f9f9;
  }
`;
const StyledTopicField = styled.div`
  border-right: 2px solid #F0F0F0;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const TopicRank = StyledTopicField.extend`
  width: 3em;
  font-weight: 500;
  color: #444;
`;
const TopicTitle = StyledTopicField.extend`
  display: inline-block;
  align-items: center;
  justify-content: flex-start;
  flex-grow: 1;
  
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.3em;
  font-size: 0.9rem;
`;
const TopicLink = styled.a`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;

  width: 100%;
  height: 100%;
  padding: 0.7em 1em;

  text-decoration: none;
  color: #333;

  &:hover {
    background-color: rgb(220,220,220);
  }
`;
const UserAvatar = styled.div`
  display: flex;
  align-items: center;
`;
const UserLink = styled.a`
  height: calc(1.5em + 4px);
	padding: 0 0.5px;
`;
const UserImage = styled.img`
  width: 1.5em;
  height: 1.5em;
  border-radius: 50%;
  border: 2px solid #F0F0F0;
`;
const Posters = StyledTopicField.extend`
  display: flex;
  flex-direction: row;
  align-items: center;
	justify-content: space-between;

  width: 8.5em;

  padding: 0 5px;
  font-size: 1.15em;
`;
const CountField = StyledTopicField.extend`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 4.5em;
  color: #555;
`;

const ForumTopic = ({ index, topic, getUserFromID }) => {
  return /*#__PURE__*/(
    React.createElement(StyledForumTopic, { className: "forum-topic" }, /*#__PURE__*/
    React.createElement(TopicRank, { className: "rank" }, index), /*#__PURE__*/
    React.createElement(TopicTitle, { className: "topic-title" }, /*#__PURE__*/React.createElement(TopicLink, { href: `https://forum.freecodecamp.org/t/${topic.slug}`, target: "_blank" }, topic.title)), /*#__PURE__*/
    React.createElement(Posters, { className: "posters" }, /*#__PURE__*/
    React.createElement(UserAvatar, { className: "avatar" },

    topic.posters.map(poster => {
      const user = getUserFromID(poster.user_id);
      return /*#__PURE__*/(
        React.createElement(UserLink, { href: `https://www.freecodecamp.org/forum/u/${user.username}`, target: "_blank" }, /*#__PURE__*/
        React.createElement(UserImage, { title: user.username, src: `https://freecodecamp.org/forum${user.avatar_template.replace('{size}', 135)}` })));


    }))), /*#__PURE__*/



    React.createElement(CountField, { className: "replies" }, topic.reply_count), /*#__PURE__*/
    React.createElement(CountField, { className: "views" }, topic.views), /*#__PURE__*/
    React.createElement(CountField, { className: "activity" }, moment(topic.bumped_at).fromNow(true))));


};

ReactDOM.render( /*#__PURE__*/React.createElement(App, null), document.getElementById("root"));