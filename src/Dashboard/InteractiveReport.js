import React from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
const IframeCustomized = styled.div`
  justify-self: center;
  background-color: white;
`;
function InteractiveReport (){
		return <div>
			<h3>Interactive Report</h3>
			<IframeCustomized> 
			<iframe src="https://baonhi3008.github.io/Dart-interactive/" width="1200" height ="1300" />;
			{/* <iframe src="https://baonhi3008.github.io/DART-testing/" width="1570" height ="1300" />; */}
			</IframeCustomized>
			
		</div>
	
}
export default InteractiveReport;