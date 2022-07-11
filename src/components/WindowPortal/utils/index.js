export const copyStyles = (sourceDoc, targetDoc) => {
  const styleSheets = Array.from(document.styleSheets).filter(
    (styleSheet) =>
      !styleSheet.href || styleSheet.href.startsWith(window.location.origin)
  );
  styleSheets.forEach((styleSheet) => {
    if (styleSheet.cssRules) {
      const newStyleEl = targetDoc.createElement('style');

      Array.from(styleSheet.cssRules).forEach((cssRule) => {
        newStyleEl.appendChild(targetDoc.createTextNode(cssRule.cssText));
      });

      targetDoc.head.appendChild(newStyleEl);
    }
  });
};
