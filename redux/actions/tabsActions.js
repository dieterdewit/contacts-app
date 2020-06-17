//Action Types
export const RESET_TABS = "RESET_TABS"
export const PAGE1_TAB = "PAGE1_TAB";
export const PAGE2_TAB = "PAGE2_TAB";


//Action Creator
export const resetTabs = () => ({
    type: RESET_TABS
});

export const pageOneTab = () => ({
    type: PAGE1_TAB
});

export const pageTwoTab = () => ({
    type: PAGE2_TAB
});