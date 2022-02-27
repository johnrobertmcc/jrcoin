import cn from "classnames";
import { createElement } from "react";
import styles from "./Container.module.css";

/**
 * Container component to keep elements at a max width.
 *
 * @param  {object}  props            The component attributes as props
 * @param  {object}  props.children   The children to contain.
 * @param  {string}  props.className  Optional classnames.
 * @param  {boolean} props.paddingTop Toggles padding-top.
 * @param  {boolean} props.paddingBtm Toggles padding-bottom.
 * @param  {boolean} props.paddingX   Optional x-axis padding.
 * @return {Element}                  The Container component.
 */
export default function Container({
  children,
  className,
  paddingTop,
  paddingBtm,
  paddingX,
  tag,
  tabIndex,
}) {
  return createElement(
    tag,
    {
      className: cn(
        styles.containerW,
        className && styles[className],
        paddingTop ? styles.paddingTop : null,
        paddingBtm ? styles.paddingBtm : null,
        paddingX ? null : styles.noSidePadding
      ),
      tabIndex: tabIndex && tabIndex,
    },
    children
  );
}

Container.defaultProps = {
  paddingX: false,
  tag: "div",
};
