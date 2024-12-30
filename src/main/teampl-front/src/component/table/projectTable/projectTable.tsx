import "./style.css"
import {Body, Cell, Header, HeaderCell, HeaderRow, Row, Table} from "@table-library/react-table-library";
import React, {useState} from "react";
import {useTheme} from "@table-library/react-table-library/theme";
import {getTheme} from "@table-library/react-table-library/baseline";
import {Project, ProjectTableData} from "../../../interface/types";
import {getFormattedDate} from "../../../util";
import InitialsImg from "../../InitialsImg";

type TableProps = {
    header: string [],
    data: ProjectTableData[],
    tableType: "Personal" | "Team" | "default";
    functions?: {  /// 페이지 이동용 함수
        onClick: (projectNum: number,owner: string, regNum?: number ) => void
    }
}

export default function ProjectTable(props: TableProps) {
    const {header, data, tableType, functions} = props;
    const node = {nodes: data}

    // 표의 테마
    const theme = useTheme(getTheme());
    const resize = {minWidth: 25}
    // 마우스 호버상태
    const [isHover, setIsHover] = useState<boolean>(false);


    return (
        <Table data={node} theme={theme}>
            {(list: ProjectTableData[]) => (
                <>
                    <Header>
                        <HeaderRow>
                            {header.map((item, index) =>
                                <HeaderCell resize={resize} className={"common-table-header"}
                                            key={index}>{item}</HeaderCell>
                            )}
                        </HeaderRow>
                    </Header>

                    <Body>
                        {list.map((item, index) =>
                            <Row className={"common-table-body-row"}
                                 key={index}
                                 item={item}
                                 onClick={() => {
                                     if (tableType === "Personal") {
                                         return functions?.onClick(item.projectNum, item.creator);
                                     }
                                     if (tableType === "Team" && item.regNum) {
                                         return functions?.onClick(item.projectNum, item.creator, item.regNum);
                                     }
                                     return () => {
                                     };  // 기본 빈 함수
                                 }}
                            >
                                <Cell className={"common-table-body-cell"}>{item.projectName}</Cell>
                                <Cell className={"common-table-body-cell"}>{getFormattedDate(item.createDate)}</Cell>
                                <Cell className={"common-table-body-cell"}>
                                    <InitialsImg name={item.creator} width={26} height={26}/>
                                </Cell>
                                <Cell
                                    className={"common-table-body-cell"}>{tableType === "Team" ? item.teamName : "-"}</Cell>
                                <Cell className={"common-table-body-cell"}>
                                    {item.stat === 0 ?
                                        <div className={"common-table-body-stat"}
                                             style={{backgroundColor: "rgba(253,188,100)"}}>진행중</div> :
                                        <div className={"common-table-body-stat"}
                                             style={{backgroundColor: "rgb(51, 211, 145)"}}>완료</div>}
                                </Cell>
                                <Cell className={"common-table-body-cell"}>{item.processed}</Cell>
                                <Cell className={"common-table-body-cell"}>{item.unProcessed}</Cell>
                            </Row>
                        )}

                    </Body>
                </>
            )}
        </Table>
    )

}