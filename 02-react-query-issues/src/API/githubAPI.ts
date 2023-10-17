import axios from "axios";


export const githubAPI = axios.create({
    baseURL:'https://api.github.com/repos/facebook/react',
    headers: {
        Authorization:'Bearer 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'
    }
});