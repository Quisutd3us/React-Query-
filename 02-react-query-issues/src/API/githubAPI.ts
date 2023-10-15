import axios from "axios";


export const githubAPI = axios.create({
    baseURL:'https://api.github.com/repos/facebook/react',
    headers: {
        Authorization:'Bearer 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'
    }
});