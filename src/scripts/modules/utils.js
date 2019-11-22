import PerfectScrollbar from 'perfect-scrollbar';

import { DOM } from "./configs/path";

//get input value
export const getInputVal = input => input.value;

//hide panel
export const hidePanel = panel => panel.classList.add('js-hidden');

//show panel
export const showPanel = panel => panel.classList.remove('js-hidden');

//perfect scrollbars init
export const scrollbarsInit = () => {

	DOM.panels.panelsArr.forEach((elem, index) => {

		const ps = new PerfectScrollbar(elem);

	});

};
