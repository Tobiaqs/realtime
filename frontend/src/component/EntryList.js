import styled from 'styled-components';

export const EntryList = styled.div`
    width: 100%;
    border-top: 1px solid #444;
`;

export const EntryItem = styled.div`
    display: flex;
    width: 100%;
    flex-flow: row wrap;
    align-items: center;
    border-bottom: 1px solid #444;
    padding: 10px;
`;

export const EntryDay = styled.div`
    margin: 60px 0;
`;

export const EntryHeading = styled.div`
    display: flex;
    justify-content: space-between;
`;

export const EntryDayHeading = styled.div`
    display: flex;
    width: 100%;
    flex-flow: row wrap;
    border-bottom: 1px solid #444;
`;

export const EntryDayHeadingDay = styled.div`
    flex: 1.75;
    text-align: left;
`;

export const EntryDayHeadingWeek = styled.div`
    flex: 1.75;
    text-align: center;
`;

export const EntryDayHeadingTime = styled.div`
    flex: 1.75;
    text-align: right;
`;

export const EntryItemDescription = styled.div`
    font-weight: bold;
    margin-right: 20px;
    flex: 3;
    cursor: ${props => (props.allowEdit ? 'pointer' : 'default')};
`;

export const EntryItemProject = styled.div`
    flex: 1.75;
    margin-right: 20px;
    cursor: ${props => (props.allowEdit ? 'pointer' : 'default')};
`;

export const EntryItemTicket = styled.div`
    flex: 0.8;
    margin-right: 20px;
    cursor: ${props => (props.allowEdit ? 'pointer' : 'default')};
`;

export const EntryItemWBSO = styled.div`
    flex: 0.9;
    display: flex;
    width: 100%;
    align-items: center;
    flex-flow: row wrap;
    cursor: ${props => (props.allowEdit ? 'pointer' : 'default')};
`;

export const EntryItemWBSOText = styled.div`
    flex: 0.3;
    margin-left: 10px;
    cursor: ${props => (props.allowEdit ? 'pointer' : 'default')};
`;

export const EntryItemTime = styled.div`
    flex: 1;
    text-align: center;
    padding: 5px;
    cursor: ${props => (props.allowEdit ? 'pointer' : 'default')};
`;

export const EntryItemActions = styled.div`
    align-self: flex-end;
`;
