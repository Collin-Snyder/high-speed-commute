import React from "react";

class DesignSquare extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      typeClass: "",
      keySquareClass: "",
      stoplightClass: "",
      schoolZoneClass: ""
    };

    this.handleDrag = this.handleDrag.bind(this);
  }

  componentDidMount() {
    this.setState({
      typeClass:
        this.props.type === "block"
          ? " block"
          : this.props.type === "street"
          ? " street"
          : ""
    });
  }

  componentDidUpdate(prevProps) {
    let keySquareClass;
    let stoplightClass;
    let schoolZoneClass = "";

    if (prevProps.type !== this.props.type) {
      this.setState(
        {
          typeClass:
            this.props.type === "block"
              ? " block"
              : this.props.type === "street"
              ? " street"
              : ""
        },
        () => {
          this.forceUpdate();
        }
      );
    }

    if (prevProps.stoplight !== this.props.stoplight) {
      this.setState(
        { stoplightClass: this.props.stoplight ? " greenlight" : "" },
        () => {
          this.forceUpdate();
        }
      );
    }

    if (prevProps.schoolzone !== this.props.schoolzone) {
      this.setState(
        { schoolZoneClass: this.props.schoolzone ? " schoolzone" : "" },
        () => {
          this.forceUpdate();
        }
      );
    }

    if (
      this.props.playerHome !== prevProps.playerHome ||
      this.props.bossHome !== prevProps.bossHome ||
      this.props.office !== prevProps.office
    ) {
      let keySquareClass;
      switch (this.props.id) {
        case this.props.playerHome:
          keySquareClass = " playerHome";
          break;
        case this.props.bossHome:
          keySquareClass = " bossHome";
          break;
        case this.props.office:
          keySquareClass = " office";
          break;
        default:
          keySquareClass = "";
      }
      this.setState({ keySquareClass }, () => {
        this.forceUpdate();
      });
    }
  }

  handleDrag(e) {
    e.dataTransfer.setDragImage(document.getElementById("dragImage"), 0, 0);
  }

  render() {
    return (
      <div
        className={`designSquare${this.state.typeClass}${this.state.keySquareClass}${this.state.stoplightClass}${this.state.schoolZoneClass}`}
        id={this.props.squareInfo.id}
        onClick={e => {
          this.props.addSquareToDesign(e);
        }}
        draggable
        onDragStart={this.handleDrag}
        onDragEnter={e => {
          this.props.addSquareToDesign(e, true);
        }}
      >
        {this.props.squareInfo.id}
      </div>
    );
  }
}

const DesignSquare1 = ({
  playerHome,
  bossHome,
  office,
  squareInfo,
  addSquareToDesign,
  isStoplight,
  isSchoolZone
}) => {
  let keySquareClass = "";
  let stoplightClass = "";
  let schoolZoneClass = "";

  keySquareClass =
    squareInfo.type === "block"
      ? " block"
      : squareInfo.type === "street"
      ? " street"
      : "";

  switch (squareInfo.id) {
    case playerHome:
      keySquareClass = " playerHome";
      break;
    case bossHome:
      keySquareClass = " bossHome";
      break;
    case office:
      keySquareClass = " office";
      break;
    default:
      keySquareClass = keySquareClass;
  }

  if (isStoplight) stoplightClass = " greenlight";

  if (isSchoolZone) schoolZoneClass = " schoolzone";

  const handleDrag = e => {
    e.dataTransfer.setDragImage(document.getElementById("dragImage"), 0, 0);
  };

  return (
    <div
      className={`designSquare${keySquareClass}${stoplightClass}${schoolZoneClass}`}
      id={squareInfo.id}
      onClick={e => {
        addSquareToDesign(e);
      }}
      draggable
      onDragStart={handleDrag}
      onDragEnter={e => {
        addSquareToDesign(e, true);
      }}
    >
      {squareInfo.id}
    </div>
  );
};

export default DesignSquare;
