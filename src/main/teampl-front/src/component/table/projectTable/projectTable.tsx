import "./style.css"
import {Body, Cell, Header, HeaderCell, HeaderRow, Row, Table} from "@table-library/react-table-library";
import React from "react";
import {useTheme} from "@table-library/react-table-library/theme";
import {getTheme} from "@table-library/react-table-library/baseline";
import {Project, ProjectTableData} from "../../../interface/types";
import {getFormattedDate} from "../../../util";

type TableProps = {
    header: string [],
    data: ProjectTableData[],
    tableType: "Personal" | "Team" | "default";
    functions?: {  /// 페이지 이동용 함수
        onClick: (projectNum: number, regNum?: number) => void
    }
}

export default function ProjectTable(props: TableProps) {
    const {header, data, tableType, functions} = props;
    const node = {nodes: data}


    const theme = useTheme(getTheme());
    const resize = {minWidth: 25}


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
                            <Row key={index} item={item}
                                 onClick={() => {
                                     if (tableType === "Personal") {
                                         return functions?.onClick(item.projectNum);
                                     }
                                     if (tableType === "Team" && item.regNum) {
                                         return functions?.onClick(item.projectNum, item.regNum);
                                     }
                                     return () => {
                                     };  // 기본 빈 함수
                                 }}>
                                {/*{Object.entries(item).map(([key, value], index) => {*/}
                                {/*        if (tableType === "Personal" || tableType === "Team") {*/}
                                {/*            const lowerCaseHeader = header.map(item => item.toLowerCase());*/}
                                {/*            if (!lowerCaseHeader.includes(key.toLowerCase())) {*/}
                                {/*                return null;*/}
                                {/*            }*/}
                                {/*        }*/}
                                {/*        return (*/}
                                {/*            <Cell className={"common-table-body-cell"}>{value as string | number}</Cell>*/}
                                {/*        )*/}
                                {/*    }*/}
                                {/*)}*/}
                                <Cell className={"common-table-body-cell"}>{item.projectName}</Cell>
                                <Cell className={"common-table-body-cell"}>{getFormattedDate(item.createDate)}</Cell>
                                <Cell className={"common-table-body-cell"}>{item.creator}</Cell>
                                <Cell className={"common-table-body-cell"}>{tableType === "Team"? item.teamName : "-"}</Cell>
                                <Cell className={"common-table-body-cell"}>{item.stat}</Cell>
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