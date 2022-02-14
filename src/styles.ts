import { useTheme } from '@mui/material';
import { createMakeAndWithStyles } from 'tss-react';

const { makeStyles: _origMakeStyles, withStyles: _origWithStyles, useStyles } = createMakeAndWithStyles({ useTheme });

function addSpecificity(value: any): any {
  return { '&&': value };
}

function isSubcomponentName(key: string): boolean {
  return key !== 'root' && /^[a-z]+$/gi.test(key);
}

function increaseSpecificityOfSubcomponents(cssObject: Record<string, any>): any {
  const result: Record<string, any> = {};

  for (const key of Object.keys(cssObject)) {
    if (isSubcomponentName(key)) {
      result[key] = addSpecificity(cssObject[key]);
    } else {
      result[key] = cssObject[key];
    }
  }

  return result;
}

const withStyles: typeof _origWithStyles = (component, cssObjectOrGetterFn, params) => {
  if (typeof cssObjectOrGetterFn === 'function') {
    const origGetterFn = cssObjectOrGetterFn;

    cssObjectOrGetterFn = (...args) => {
      return increaseSpecificityOfSubcomponents(origGetterFn(...args));
    };
  } else {
    cssObjectOrGetterFn = increaseSpecificityOfSubcomponents(cssObjectOrGetterFn);
  }

  return _origWithStyles(component, cssObjectOrGetterFn, params);
};

function makeStyles<Params = void, RuleNameSubsetReferencableInNestedSelectors extends string = never>(params?: {
  name?: string | Record<string, unknown>;
}) {
  const origUseStyles = _origMakeStyles<Params, RuleNameSubsetReferencableInNestedSelectors>(params);
  const useStyles: typeof origUseStyles = (cssObjectByRuleNameOrGetCssObjectByRuleName) => {
    if (typeof cssObjectByRuleNameOrGetCssObjectByRuleName === 'function') {
      return origUseStyles((...args) =>
        increaseSpecificityOfSubcomponents(cssObjectByRuleNameOrGetCssObjectByRuleName(...args))
      ) as any;
    } else {
      return origUseStyles(increaseSpecificityOfSubcomponents(cssObjectByRuleNameOrGetCssObjectByRuleName));
    }
  };

  return useStyles;
}

export { makeStyles, withStyles, useStyles, _origWithStyles, _origMakeStyles }; // _origWithStyles/_origMakeStyles shouldn't be used, we just need to export it as well because of the typeof of withStyles/makeStyles
