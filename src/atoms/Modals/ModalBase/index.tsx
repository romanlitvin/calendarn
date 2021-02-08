import React, { CSSProperties, Ref } from "react";

import "./styles.scss";
import { TOnDivClickEvent } from "../../../types";

interface IProps {
  onClose?: () => void;
  onShow?: () => void;
  backdropColor?: string;
  containerStyle?: CSSProperties;
  isFullWidth?: boolean;
}

interface IState {
  isVisible: boolean;
}

export type TModalBaseRef = Ref<ModalBase>;
export type TModalBase = ModalBase;

class ModalBase extends React.PureComponent<IProps, IState> {
  state = {
    isVisible: false,
  };
  private windowOffset = 0;

  componentDidMount() {
    this.addBodyScrollListener();
    if (this.props.onClose) {
      window.addEventListener("keydown", this.listenKeyboard, true);
    }
  }

  componentWillUnmount() {
    if (this.props.onClose) {
      window.removeEventListener("keydown", this.listenKeyboard, true);
    }
  }

  addBodyScrollListener = (): void =>
    window.addEventListener("scroll", () => {
      document.documentElement.style.setProperty(
        "--scroll-y",
        `${window.scrollY}px`,
      );
    });

  resetBodyScroll = (): void => {
    document.body.setAttribute("style", "");
    window.scrollTo(0, this.windowOffset);
  };

  closeModalDialog = (event: TOnDivClickEvent): void => {
    event.stopPropagation();
    this.setState({ isVisible: false }, () => {
      this.resetBodyScroll();
      if (this.props.onClose) {
        this.props.onClose();
      }
    });
  };

  setBodyFixed = (): void => {
    this.windowOffset = window.scrollY;
    document.body.setAttribute(
      "style",
      `position: fixed; top: -${this.windowOffset}px; left: 0; right: 0;`,
    );
  };

  openModalDialog = (): void =>
    this.setState({ isVisible: true }, () => {
      this.setBodyFixed();
      if (this.props.onShow) {
        this.props.onShow();
      }
    });

  listenKeyboard = (event: KeyboardEvent) => {
    if (event.key === "Escape" || event.keyCode === 27) {
      this.props.onClose && this.props.onClose();
    }
  };

  childrenClickPlug = (event: TOnDivClickEvent): void =>
    event.stopPropagation();

  public render() {
    const { backdropColor, containerStyle, isFullWidth } = this.props;
    if (!this.state.isVisible) {
      return null;
    }
    return (
      <div className={"modal-container-div"}>
        <div
          className={"modal-overlay-div"}
          {...(backdropColor && { style: { background: backdropColor } })}
        />
        <div className={"modal-content-div"} onClick={this.closeModalDialog}>
          <div
            className={"modal-dialog-div"}
            {...(!isFullWidth && { onClick: this.childrenClickPlug })}
            style={{
              ...containerStyle,
              ...(isFullWidth && { width: "100%", height: "100%", cursor: "pointer" }),
            }}>
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
}

export default ModalBase;
