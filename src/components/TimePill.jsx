import styled from 'styled-components';

const Pill = styled.li`
    font-size: 11px;
    line-height: 12px;
    border: solid 1px #282c34;
    padding: 6px 10px;
    border-radius: 15px;
`
export default function TimePill({isActive,title,onPillClick}) {

    return(
        <Pill
            className={isActive ? 'active' : ''}
            isActive={isActive}
            onClick={onPillClick}
        >{title}</Pill>
    )
}