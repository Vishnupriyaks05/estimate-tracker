/**
 * @file src\components\inputComponnets\SelectedTechnologyBadge.js
 * @brief  to display a "badge" for each technology that the user has selected
 * @date May 2024
 * @author ZCO Engineer
 * @copyright (c) 2024, ZCO
 */
import React from 'react';
import { Badge } from 'react-bootstrap';

const SelectedTechnologyBadge = ({ technology, onRemove }) => {
    return (
        <Badge pill variant="primary" className="m-1">
            {technology} <span onClick={() => onRemove(technology)} style={{ cursor: 'pointer' }}>&times;</span>
        </Badge>
    );
};

export default SelectedTechnologyBadge;
