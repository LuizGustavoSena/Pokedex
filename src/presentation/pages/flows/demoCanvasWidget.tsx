import { css, Global } from '@emotion/react';
import styled from '@emotion/styled';
import * as React from 'react';
import { memo } from 'react';

export interface DemoCanvasWidgetProps {
	color?: string;
	background?: string;
}

namespace S {
	export const Container = styled.div<{ color: string; background: string }>`
		width: 80%;
		height: 80%;
		background-color: ${(p) => p.background};
		border: 1px solid gray;
		background-size: 50px 50px;
		display: flex;

		> * {
			height: 100%;
			min-height: 100%;
			width: 100%;
		}
	`;

	export const Expand = css`
		html,
		body,
		#root {
			height: 100%;
		}
	`;
}

const DemoCanvasWidget: React.FC<React.PropsWithChildren<DemoCanvasWidgetProps>> = ({
	background,
	color,
	children
}: React.PropsWithChildren<DemoCanvasWidgetProps>) => {
	return (
		<>
			<Global styles={S.Expand} />
			<S.Container
				background={background || 'rgb(60, 60, 60)'}
				color={color || 'rgba(255,255,255, 0.05)'}
			>
				{children}
			</S.Container>
		</>
	);
};

export default memo(DemoCanvasWidget);